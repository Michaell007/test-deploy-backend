import BonLivraison from "../../../models/bonLivraison";
import DetailsBonLivraison from "../../../models/detailsBonLivraison";
import StockDirection from "../../../models/stockDirection";
import Lot from "../../../models/lot";
 import Facture from "../../../models/facture";
 import DetailsFacture from "../../../models/detailsFacture";
import PrixClient from "../../../models/prix";
import Taxe from "../../../models/taxeTVA";
import Client from "../../../models/client";
import FactureAvoir from "../../../models/factureAvoir";
import moment from "moment";

export default async ({ params, body }, res, next) => {
    try {
        const bonLivraison = await BonLivraison.findOne({where: { id: params.id }})
        if(bonLivraison == null){
            return res.sendUserError("Le bon de Livraison est incorrect")
        }

        if(bonLivraison.etat === "Terminé" || bonLivraison.etat === body.etat ){
            return res.sendUserError("Bon de livraison terminé")
        }

        if(body.etat === "Réjeté"){
            if (body.commentaire == null || body.commentaire === ""){
                return res.sendUserError("Veillez sasir le motif de votre refus")
            }

            await bonLivraison.update({
                commentaire: body.commentaire
            });

            return res.json({
                success: true,
                bonLivraison: bonLivraison
            })
        }

        if(body.etat !== "Terminé"){
            return res.sendUserError("Veillez valider ou refuser la bonLivraison")
        }

        let facture = await Facture.findOne({ where:{ id: bonLivraison.FactureId}})
        if(facture == null){
            return res.sendUserError("Aucun Facture associée")
        }

        let detailsFacture = await DetailsFacture.findAll({where: { FactureId: facture.id}})
        if(detailsFacture == null){
            return res.sendUserError("Aucun Details facture associée")
        }

        for (let i = 0; i < detailsFacture.length; i++) {
            const stockDirection = await StockDirection.findOne({
                where: {
                    ArticleId: detailsFacture[i].ArticleId,
                    DirectionId: bonLivraison.DirectionId
                }
            })
            if(body.detailsExit[i].quantite > stockDirection.quantite){
                return res.sendUserError("Impossible stock insuffisant!")
            }

            for (let j = 0; j < body.detailsExit[i].lots.length; j++) {
                const lot = await Lot.findOne({where: { libelle: body.detailsExit[i].lots[j].libelle, ArticleId: detailsFacture[i].ArticleId}})
                if(lot == null){
                    return res.sendUserError("Lot indisponible!")
                }
            }
        }

        await bonLivraison.update({
            etat: body.etat,
            commentaire: body.commentaire,
            expedition: body.expedition,
            dateLivraison: moment(body.dateLivraison,'DD/MM/YYYY',true).format(),
            montantTotal: 0,
            quantiteTotal: 0
        });

        let detailsLivraisons = await DetailsBonLivraison.findAll({where: { BonLivraisonId: bonLivraison.id}})
        if(detailsLivraisons == null){
            return res.sendUserError("Aucun Details livraison associée")
        }

        const client = await Client.findOne({ where: { id: bonLivraison.ClientId}})
        if(client == null){
            return res.sendUserError("Client non reconu!")
        }

        let qLivr = 0, qCmd = 0;
        for (let i = 0; i < detailsLivraisons.length; i++) {
            const stockDirection = await StockDirection.findOne({
                where: {
                    ArticleId: detailsLivraisons[i].ArticleId,
                    DirectionId: bonLivraison.DirectionId
                }
            })

            const prix = await PrixClient.findOne({ where: { CategoryClientId: client.CategoryClientId, ArticleId: detailsLivraisons[i].ArticleId}});
            if(prix == null){
                return res.sendUserError("Prix non disponible pour ce article")
            }

            var taxe = await Taxe.findOne({ where: {id: detailsFacture[i].TaxeId}})
            if(taxe == null){
                return res.sendUserError("Cette taxe est incorrect!")
            }

            let lotQuantity = 0;
            let lot;
            for (let j = 0; j < body.detailsExit[i].lots.length; j++) {
                lot = await Lot.findOne({where: { libelle: body.detailsExit[i].lots[j].libelle, ArticleId: detailsLivraisons[i].ArticleId}})
                if(lot == null){
                    return res.sendUserError("Lot indisponible!")
                }
                if(body.detailsExit[i].lots[j].quantite > stockDirection.quantite){
                    body.detailsExit[i].lots[j].quantite = stockDirection.quantite;
                }

                lotQuantity += body.detailsExit[i].lots[j].quantite
            }

            // if(lotQuantity > detailsLivraisons[i].quantiteCmd){
            //     lotQuantity = detailsLivraisons[i].quantiteCmd;
            // }

            await detailsLivraisons[i].update({
                quantiteLivre: lotQuantity,
                montant: lotQuantity * detailsLivraisons[i].prix,
                LotId: lot.id,
            });

            await bonLivraison.update({
                quantiteTotal: bonLivraison.quantiteTotal + detailsLivraisons[i].quantiteLivre,
                montantTotal: bonLivraison.montantTotal + detailsLivraisons[i].montant
            });

            await bonLivraison.update({
                montantTotal: bonLivraison.montantTotal - ((detailsLivraisons[i].quantiteLivre * detailsLivraisons[i].prix * detailsFacture[i].remise) / 100)
            });

            await bonLivraison.update({
                montantTotal: bonLivraison.montantTotal + ((detailsLivraisons[i].quantiteLivre * detailsLivraisons[i].prix * taxe.taux) / 100)
            });

            await stockDirection.update ({
                quantite: stockDirection.quantite - detailsLivraisons[i].quantiteLivre
            });

            qLivr += detailsLivraisons[i].quantiteLivre;
            qCmd += detailsLivraisons[i].quantiteCmd;
        }

        let quantiteReste = qCmd - qLivr;
        if(quantiteReste > 0){
            await bonLivraison.update({
                etat: "En cours"
            });

            const date = new Date()
            let factureAvoir;
            if(bonLivraison.DirectionId == null){
                factureAvoir = await FactureAvoir.create({
                    refFACT: "FACT_AV00" + bonLivraison.id + "-" + date.getFullYear(),
                    ShowroomId: bonLivraison.ShowroomId,
                    etat: "En Attente",
                    montantTotalHT: 0,
                    montantTotalTaxe: 0,
                    montantTotalTTC: 0,
                    montantTotalRemise: 0,
                    ClientId: bonLivraison.ClientId,
                    remiseTotal: 0,
                    taxeTotal: 0,
                    adresseFacturation: facture.adresseFacturation,
                    payementMode: facture.payementMode,
                    representant: facture.representant,
                    BonLivraisonId: bonLivraison.id
                    //UserId:
                });
            }
            else{
                factureAvoir = await FactureAvoir.create({
                    refFACT: "FACT_AV00" + bonLivraison.id + "-" + date.getFullYear(),
                    DirectionId: bonLivraison.DirectionId,
                    etat: "En Attente",
                    montantTotalHT: 0,
                    montantTotalTaxe: 0,
                    montantTotalTTC: 0,
                    montantTotalRemise: 0,
                    ClientId: bonLivraison.ClientId,
                    remiseTotal: 0,
                    taxeTotal: 0,
                    adresseFacturation: facture.adresseFacturation,
                    payementMode: facture.payementMode,
                    representant: facture.representant,
                    BonLivraisonId: bonLivraison.id
                    //UserId:
                });
            }

            for (let i = 0; i < detailsLivraisons.length; i++) {
                if(detailsLivraisons[i].quantiteCmd - detailsLivraisons[i].quantiteLivre > 0){
                    await DetailsFacture.create({
                        ArticleId: detailsLivraisons[i].ArticleId,
                        FactureAvoirId: factureAvoir.id,
                        quantite: quantiteReste,
                        prix: detailsFacture[i].prix,
                        TaxeId: detailsFacture[i].TaxeId,
                        remise: detailsFacture[i].remise,
                        montant: quantiteReste * detailsFacture[i].prix
                    });

                    /*let bonLivraisonAvoir = await BonLivraison.create({
                        refBL: "BL00" + "_" + "Restant" + bonLivraison.id + date.getFullYear(),
                        DirectionId: bonLivraison.DirectionId,
                        etat: "En Attente",
                        ClientId: bonLivraison.ClientId,
                        adresseLivraison: bonLivraison.adresseLivraison,
                        quantiteTotal: quantiteReste,
                        montantTotal: 0
                        //UserId:
                    });

                    let detailsLivraisonDirection = [];
                    detailsLivraisonDirection[i] = await DetailsBonLivraison.create({
                        ArticleId: detailsLivraisons[i].ArticleId,
                        BonLivraisonId: bonLivraisonAvoir.id,
                        quantiteCmd: quantiteReste,
                        quantiteLivre: 0,
                        prix: detailsLivraisons[i].prix,
                        montant: quantiteReste * detailsLivraisons[i].prix,
                    });*/


                    await factureAvoir.update({
                        montantTotalRemise: factureAvoir.montantTotalRemise + ((quantiteReste * detailsFacture[i].prix * detailsFacture[i].remise) / 100)
                    });

                    await factureAvoir.update({
                        montantTotalHT: factureAvoir.montantTotalHT + (quantiteReste * detailsFacture[i].prix) - factureAvoir.montantTotalRemise
                    });

                    await factureAvoir.update({
                        montantTotalTaxe: factureAvoir.montantTotalTaxe + ((quantiteReste * detailsFacture[i].prix * taxe.taux) / 100)
                    });
                }
            }
            await factureAvoir.update({
                montantTotalTTC: factureAvoir.montantTotalHT + factureAvoir.montantTotalTaxe
            });

        }
        else if(quantiteReste === 0){
            await bonLivraison.update({
                etat: "Terminé"
            });
        }

        return res.json({
            success: true,
            bonLivraison: bonLivraison
        })


    } catch (error) {
        return next(error)
    }
}