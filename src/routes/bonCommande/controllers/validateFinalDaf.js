import BonCommande from "../../../models/bonCommande";
import DetailsBonCommande from "../../../models/detailsBonCommande";
import _ from "lodash";
import BonReception from "../../../models/bonReception";
import DetailsBonReception from "../../../models/detailsBonReception";
import Fournisseur from "../../../models/fournisseur";
// import CaisseDirection from "../../../models/caisseDirection";
// import CompteBanque from "../../../models/compteBanque";
// import Payement from "../../../models/payement";

export default async ({ params, body  }, res, next) => {
    try {
        const bonCommande = await BonCommande.findOne({where: { id: params.id }})
        if(bonCommande == null){
            return res.sendUserError("Le bon de commande est incorrect")
        }

        if(bonCommande.validateByDG !== true){
            return res.sendUserError("Bon non validé par le DG!")
        }

        if(body.etat !== "Terminé"){
            return res.sendUserError("Veillez valider le bon de commande!")
        }

        if(bonCommande.etat === body.etat){
            return res.sendUserError("Ce bon est deja validé")
        }

        let detailBonCommande = await DetailsBonCommande.findAll({where: {BonCommandeId: bonCommande.id}})
        if(detailBonCommande == null){
            return res.sendUserError("Il n'y a pas de details pour ce bon de commande")
        }

        let fournisseur = await Fournisseur.findOne({where:{ id: bonCommande.FournisseurId}})
        if(fournisseur == null){
            return res.sendUserError("Fournisseur inconnu")
        }

        const date = new Date()

        /*if(body.payementMode === "Cash"){
            if(body.accompte < bonCommande.montantTotal){
                return  res.sendUserError("Veillez payer la totalité.")
            }

            const caisse = await CaisseDirection.findOne({ where: { DirectionId: bonCommande.DirectionId}})
            if(caisse == null){
                await bonCommande.update({
                    accompte: 0,
                });

                await CaisseDirection.create({
                    montant: 0,
                    DirectionId: bonCommande.DirectionId
                })

                return  res.sendUserError("Caisse indisponible.")
            }

            if(caisse.montant - parseInt(body.accompte) < 0){
                return  res.sendUserError("Impossible fond insufissant.")
            }

            const bonReception = await BonReception.create({
                BonCommandeId: bonCommande.id,
                DirectionId: bonCommande.DirectionId,
                montantTotal: 0,
                montantTotalResultat: 0,
                etat: "En Attente",
                FournisseurId: bonCommande.FournisseurId,
                //UserId: ""
            })


            await Promise.all(_.forEach(detailBonCommande, (async (entity)=>  {
                await DetailsBonReception.create({
                    ArticleId: entity.ArticleId,
                    quantiteCmd: entity.quantite,
                    prix: entity.prix,
                    montant: 0,
                    BonReceptionId: bonReception.id
                });
            })));

            await Payement.create({
                DirectionId: bonCommande.DirectionId,
                payementMode: body.payementMode,
                montant: bonCommande.montantTotal,
                FournisseurId: bonCommande.FournisseurId,
                BonCommandeId: bonCommande.id,
                //UserId:
            });

            await caisse.update({
                montant: caisse.montant - parseInt(body.accompte)
            })

            await bonCommande.update({
                payementMode: body.payementMode,
                accompte: parseInt(body.accompte),
                reglementJour: 0,
                reglementCash: true,
                etat: body.etat
            });

            await bonReception.update({
                refBR: "BR" + "_" +bonReception.id + "-" + date.getFullYear(),
            });

            return res.json({
                success: true,
                bonCommande: bonCommande
            })
        }*/

        // const compteBanque = await CompteBanque.findOne({ where: { DirectionId: bonCommande.DirectionId}})
        // if(compteBanque == null){
        //     await bonCommande.update({
        //         accompte: 0,
        //     });
        //
        //     return  res.sendUserError("Caisse indisponible.")
        // }

        // if(compteBanque.montant - parseInt(body.accompte) < 0){
        //     return  res.sendUserError("Impossible fond insufissant.")
        // }

        if (fournisseur.modalitePayement){
            body.delais = fournisseur.modalitePayement;
        }

        const bonReception = await BonReception.create({
            refBR: "BR00" + bonCommande.id + "-" + date.getFullYear(),
            BonCommandeId: bonCommande.id,
            DirectionId: bonCommande.DirectionId,
            montantTotal: 0,
            montantTotalResultat: 0,
            etat: "En Attente",
            FournisseurId: bonCommande.FournisseurId,
            // payementMode: body.payementMode,
            accompte: 0,
            reglementJour: body.delais,
            //UserId: ""
        })

        if(body.accompte !== undefined){
            await bonReception.update({
                accompte: parseInt(body.accompte)
            })
        }


        await Promise.all(_.forEach(detailBonCommande, (async (entity)=>  {
            await DetailsBonReception.create({
                ArticleId: entity.ArticleId,
                quantiteCmd: entity.quantite,
                prix: entity.prix,
                montant: 0,
                BonReceptionId: bonReception.id
            });
        })));

        /*await bonReception.update({
            refBR: "BR" + "_" +bonReception.id + "-" + date.getFullYear(),
        });*/


        return res.json({
            success: true,
            bonCommande: bonCommande
        })

    } catch (error) {
        return next(error)
    }
}