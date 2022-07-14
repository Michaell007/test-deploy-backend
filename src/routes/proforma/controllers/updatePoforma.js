import Article from "../../../models/article";
import Proforma from "../../../models/proforma";
import DetailsProforma from "../../../models/detailsProforma";
import Client from "../../../models/client";
import PrixClient from "../../../models/prix";
import Taxe from "../../../models/taxeTVA";
import ParametreClient from "../../../models/parametreClient";

export default async ({ body, params }, res, next) => {
    try {
        const proforma = await Proforma.findOne({ where: { id: parseInt(body.DirectionId)} }) ;
        if (proforma == null){
            return res.sendUserError("Cette Proforma n'existe pas");
        }

        if (proforma.etat === "Terminé"){
            return res.sendUserError("Impossible Proforma déjà terminée!")
        }

        const client = await Client.findOne({ where: { id: body.ClientId}})
        if(client == null){
            return res.sendUserError("Client non reconu!")
        }

        const paramClient = await ParametreClient.findOne({where: { ClientId: client.id}});
        if(paramClient == null){
            return res.sendUserError("Parametre du client indisponible!")
        }

        if(paramClient.adresseExpedition == null){
            body.adresseLivraison = paramClient.adresseExpedition;
        }

        let detailsProformas = await DetailsProforma.findAll({where: { ProformaId: proforma.id}})
        if(detailsProformas == null){
            return res.sendUserError("Pas details pour cette Proforma")
        }

        proforma.update({
            montantTotalHT: 0,
            montantTotalTaxe: 0,
            montantTotalTTC: 0,
            montantTotalRemise: 0,
            ClientId: client.id,
            remiseTotal: 0,
            taxeTotal: 0,
            adresseFacturation: body.adresseFacturation,
            adresseLivraison: body.adresseLivraison,
            validateByDG: false
            //UserId:
        });

        //Création de detail Entrée
        for (let i = 0; i < body.detailsSell.length; i++) {
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

            await detailsProformas[i].update({
                ArticleId: article.id,
                ProformaId: proforma.id,
                quantite: parseInt(body.detailsSell[i].quantite),
                prix: prix.intitule,
                TaxeId: taxe.id,
                remise: body.detailsSell[i].remise,
                montant: (parseInt(body.detailsSell[i].quantite) * prix.intitule),
            });

            await proforma.update({
                montantTotalRemise: proforma.montantTotalRemise + (((parseInt(body.detailsSell[i].quantite) * prix.intitule) * detailsProformas[i].remise) / 100)
            });

            await proforma.update({
                montantTotalHT: proforma.montantTotalHT + detailsProformas[i].montant - proforma.montantTotalRemise
            });

            await proforma.update({
                montantTotalTaxe: proforma.montantTotalTaxe + ((proforma.montantTotalHT * taxe.taux) / 100)
            });
        }

        if(body.taxeTotal !== undefined && body.remiseFixe !== undefined){
            await proforma.update({
                taxeTotal: parseInt(body.tvaTotal),
                remiseTotal: parseInt(body.remiseFixe),
                montantTotalRemise: proforma.montantTotalRemise + proforma.montantTotalRemise,
            });

            await proforma.update({
                montantTotalHT: proforma.montantTotalHT - proforma.montantTotalRemise,
            });

            await proforma.update({
                montantTotalTaxe: proforma.montantTotalTaxe + ((proforma.montantTotalHT * body.taxeTotal) / 100)
            });
        }

        await proforma.update({
            etat: "En cours",
            montantTotalTTC: proforma.montantTotalHT + proforma.montantTotalTaxe
        });

        return res.json({
            success: true,
            proforma: proforma
        });


    } catch (error) {
        return next(error)
    }
}