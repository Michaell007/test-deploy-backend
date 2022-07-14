import Article from "../../../models/article";
import Facture from "../../../models/facture";
import DetailsFacture from "../../../models/detailsFacture";
import Client from "../../../models/client";
import PrixClient from "../../../models/prix";
import Taxe from "../../../models/taxeTVA";
import ParametreClient from "../../../models/parametreClient";

export default async ({ body, params }, res, next) => {
    try {
        const facture = await Facture.findOne({ where: { id: params.id} }) ;
        if (facture == null){
            return res.sendUserError("Facture incorrect!");
        }

        if (facture.etat === "Terminé" || facture.solde === true ){
            return res.sendUserError("Impossible Facture déjà terminée!")
        }

        if (facture.etat === "Imapyé" ){
            return res.sendUserError("Impossible payement de la facture initié!")
        }


        const client = await Client.findOne({ where: { id: body.ClientId}})
        if(client == null){
            return res.sendUserError("Client non reconu!")
        }

        const paramClient = await ParametreClient.findOne({where: { ClientId: client.id}});
        if(paramClient == null){
            return res.sendUserError("Parametre du client indisponible!")
        }

        if(paramClient.modalitePayement !== null){
            body.payementMode = "reglementJour";
            body.delais = paramClient.modalitePayement;
        }

        if(paramClient.representant !== null){
            body.representant = paramClient.representant;
        }

        let details = await DetailsFacture.findAll({where: {FactureId: facture.id}})
        if(details == null){
            return res.sendUserError("Pas details pour cette facture")
        }

        facture.update({
            payementMode: body.payementMode,
            representant: body.representant,
            montantTotalHT: 0,
            montantTotalTaxe: 0,
            montantTotalTTC: 0,
            montantTotalRemise: 0,
            ClientId: body.ClientId,
            remiseTotal: body.remiseTotal,
            taxeTotal: body.taxeTotal,
            adresseFacturation: body.adresseFacturation,
            solde: false,
            reglementJour: body.delais,
        });


        //Création de detail Entrée
        for (let i = 0; i < details.length; i++) {
            const article = await Article.findOne({where: {id: parseInt(body.detailsSell[i].ArticleId)}});
            if (article == null){
                return res.sendUserError("Cet article n'existe pas")
            }

            const prix = await PrixClient.findOne({ where: { CategoryClientId: client.CategoryClientId, ArticleId: article.id}});
            if(prix == null){
                return res.sendUserError("Prix non disponible pour ce article")
            }

            let taxe;
            if(paramClient.exenoreTaxe === true || body.exonere === true){
                taxe = await Taxe.findOne({where: { taux: 0}})
                if(taxe == null){
                    return res.sendUserError("Cette taxe est incorrect!")
                }
            }
            else{
                if(paramClient.TaxeId !== null){
                    taxe = await Taxe.findOne({ where: {id: paramClient.TaxeId}})
                    if(taxe == null){
                        return res.sendUserError("Cette taxe est incorrect!")
                    }
                }
                else{
                    taxe = await Taxe.findOne({ where: {id: body.detailsSell[i].taxeId}})
                    if(taxe == null){
                        return res.sendUserError("Cette taxe est incorrect!")
                    }
                }
            }

            await details[i].update({
                ArticleId: article.id,
                FactureId: facture.id,
                quantite: parseInt(body.detailsSell[i].quantite),
                prix: prix.intitule,
                TaxeId: taxe.id,
                remise: body.detailsSell[i].remise,
                montant: (parseInt(body.detailsSell[i].quantite) * prix.intitule),
            });

            await facture.update({
                montantTotalRemise: facture.montantTotalRemise + (((details[i].quantite * prix.intitule) * details[i].remise) / 100)
            });

            await facture.update({
                montantTotalHT: facture.montantTotalHT + details[i].montant - facture.montantTotalRemise
            });

            await facture.update({
                montantTotalTaxe: facture.montantTotalTaxe + ((facture.montantTotalHT * taxe.taux) / 100)
            });
        }

        if(body.taxeTotal !== undefined && body.remiseFixe !== undefined){
            await facture.update({
                taxeTotal: parseInt(body.tvaTotal),
                remiseTotal: parseInt(body.remiseFixe),
                montantTotalTaxe: facture.montantTotalTaxe + ((facture.montantTotalHT * body.taxeTotal) / 100),
                montantTotalRemise: facture.montantTotalRemise + ((facture.montantTotalHT * body.remiseFixe) / 100)
            });
        }


        if(body.taxeTotal !== undefined && body.remiseFixe !== undefined){
            await facture.update({
                taxeTotal: parseInt(body.tvaTotal),
                remiseTotal: parseInt(body.remiseFixe),
                montantTotalRemise: facture.montantTotalRemise + facture.montantTotalRemise,
            });

            await facture.update({
                montantTotalHT: facture.montantTotalHT - facture.montantTotalRemise,
            });

            await facture.update({
                montantTotalTaxe: facture.montantTotalTaxe + ((facture.montantTotalHT * body.taxeTotal) / 100)
            });
        }

        await facture.update({
            etat: "En Attente",
            montantTotalTTC: facture.montantTotalHT + facture.montantTotalTaxe
        });

        return res.json({
            success: true,
            facture: facture
        });


    } catch (error) {
        return next(error)
    }
}