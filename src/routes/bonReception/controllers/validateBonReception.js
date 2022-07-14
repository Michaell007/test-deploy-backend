import BonCommande from "../../../models/bonCommande";
import BonReception from "../../../models/bonReception";
import DetailsBonReception from "../../../models/detailsBonReception";
import StockDirection from "../../../models/stockDirection";
import DetailsDon from "../../../models/detailsDon";
import Article from "../../../models/article";
import DetailsBonCommande from "../../../models/detailsBonCommande";
import CompteFournisseur from "../../../models/compteFournisseur";
import Lot from "../../../models/lot";
// import _ from "lodash";
import moment from "moment";
import CompteBanque from "../../../models/compteBanque";

export default async ({ params, body }, res, next) => {
    try {

        const bonReception = await BonReception.findOne({where: { id: params.id }})
        if(bonReception == null){
            return res.sendUserError("Le bon de reception est incorrect")
        }

        if(body.etat !== "Terminé"){
            return res.sendUserError("Veillez valider le bon de reception!")
        }
        if(bonReception.etat === body.etat){
            return res.sendUserError("Ce bon est deja validé")
        }

        if(bonReception.etat === "Terminé"){
            return res.sendUserError("Ce bon est deja soldé")
        }

        if(bonReception.etat === "Impayé"){
            return res.sendUserError("Ce bon est deja en intance de payement")
        }


        const bonCommande = await BonCommande.findOne({where: { id: bonReception.BonCommandeId}})
        if(bonCommande == null){
            return res.sendUserError("Aucun bon de commande n'est associé a ce ID")
        }

        const detailBonCommande = await DetailsBonCommande.findAll({where: { BonCommandeId: bonReception.BonCommandeId}})
        if(detailBonCommande == null){
            return res.sendUserError("Aucun detail de bon de commande n'est associé a ce ID")
        }

        let detailBonReception = await DetailsBonReception.findAll({where: {BonReceptionId: bonReception.id}})
        if(detailBonReception == null || detailBonReception === []){
            return res.sendUserError("Il n'y a pas de details pour ce bon de reception")
        }

        await bonReception.update({
            montantTotal: 0,
            montantTotalResultat: 0,
        });

        for (let i = 0; i < detailBonReception.length; i++) {
            const stockDirection = await StockDirection.findOne({
                where: {
                    ArticleId: detailBonReception[i].ArticleId,
                    DirectionId: bonReception.DirectionId
                }
            })
            if (stockDirection == null){
                return res.sendUserError("Impossible! Stock inexistant pour cet article.");
            }

            let article = await Article.findOne({where:{ id: detailBonReception[i].ArticleId}})
            if (article == null){
                return res.sendUserError("Article Indisponible!");
            }
            const referenceExist = await Article.findOne({ where: { reference: body.detailsEntries[i].reference} });
            if (referenceExist == null) {
                await article.update({
                    reference: body.detailsEntries[i].reference
                })
            }

            // console.log(body.detailsEntries[i].lots)
            let lotQuantity = 0;
            for (let j = 0; j < body.detailsEntries[i].lots.length; j++) {
                const libelleExist = await Lot.findOne({ where: { libelle: body.detailsEntries[i].lots[j].libelle} });
                if (libelleExist !== null) {
                    return res.sendUserError("Ce libelle de lot est déjà utilisé.");
                }
                let lot = await Lot.create({
                    libelle: body.detailsEntries[i].lots[j].libelle,
                    quantite: body.detailsEntries[i].lots[j].quantite,
                    datePeremption: moment(body.detailsEntries[i].lots[j].datePeremption, 'DD/MM/YYYY', true).format(),
                    ArticleId: article.id
                })
                lotQuantity += lot.quantite
            }

            let reste = lotQuantity - detailBonReception[i].quantiteCmd;
            if(reste > 0){
                let detailsCad = [];
                detailsCad[i] =  await DetailsDon.create({
                    ArticleId: article.id,
                    BonReceptionId: bonReception.id,
                    quantite: reste
                })

                await stockDirection.update ({
                    quantite: stockDirection.quantite + detailsCad[i].quantite
                });

                //lotQuantity = detailBonCommande[i].quantite;
            }

            await detailBonReception[i].update({
                quantiteLivre: lotQuantity,
                montant: lotQuantity * detailBonReception[i].prix,
                ecart: detailBonReception[i].quantiteCmd - lotQuantity,
                resultat: (detailBonReception[i].quantiteCmd - lotQuantity) * detailBonReception[i].prix,
            })

            await bonReception.update({
                montantTotal: bonReception.montantTotal + (detailBonReception[i].montant),
                montantTotalResultat: bonReception.montantTotalResultat + detailBonReception[i].resultat
            });



            await stockDirection.update ({
                quantite: stockDirection.quantite + detailBonReception[i].quantiteLivre
            });

        }

        /*if(body.detailsGifts !== undefined && body.detailsGifts !== null){

            for(let i = 0; i < body.detailsGifts.length; i++){

                const article = await Article.findOne({where: {id: parseInt(body.detailsGifts[i].ArticleId)}})
                if (article == null){
                    return res.sendUserError("Cet article n'existe pas")
                }

                const stockDirection = await StockDirection.findOne({
                    where: {
                        ArticleId: article.id,
                        DirectionId: bonReception.DirectionId
                    }
                })
                if (stockDirection == null) {
                    return res.sendUserError("Impossible! Stock inexistant pour cet article.");
                }

                let detailsCad = [];
                detailsCad[i] =  await DetailsDon.create({
                    ArticleId: article.id,
                    BonReceptionId: bonReception.id,
                    quantite: parseInt(body.detailsGifts[i].quantite)
                })


                //Mettre a jour la quantité de ce stock; quantitéStock = quantiteStock plus quantite
                await stockDirection.update ({
                    quantite: stockDirection.quantite + detailsCad[i].quantite
                });
            }
        }*/
        const compteBanque = CompteBanque.findOne({where: {DirectionId: bonReception.DirectionId}});
        if(compteBanque.montant < bonReception.accompte){
            await bonCommande.update({
                etat: body.etat
            });
            return res.sendUserError("Payement impossible, fond insuffisant!")
        }
        await compteBanque.update({
            montant: compteBanque.montant - bonReception.accompte
        })


        const compteFournisseurExist = await CompteFournisseur.findOne({where: { FournisseurId: bonReception.FournisseurId}});
        if(compteFournisseurExist == null){
            await CompteFournisseur.create({
                // montant: 0,
                montantRestant: bonReception.montantTotal - bonReception.accompte,
                FournisseurId: bonReception.FournisseurId
            })
        }
        else{
           await compteFournisseurExist.update({
                montantRestant: compteFournisseurExist.montantRestant + bonReception.montantTotal - bonReception.accompte
            });
        }

        await bonCommande.update({
            etat: body.etat
        });

        if(bonReception.montantTotal <= bonReception.accompte){
            await bonReception.update({
                etat: "Terminé"
            })
        }
        else{
            await bonReception.update({
                etat: "Impayé"
            })
        }

        return res.json({
            success: true,
            bonReception: bonReception
        })

    } catch (error) {
        return next(error)
    }
}