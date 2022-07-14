import Article from "../../../models/article";
import Facture from "../../../models/facture";
import DetailsFacture from "../../../models/detailsFacture";
import Direction from "../../../models/direction";
import Client from "../../../models/client";
import PrixClient from "../../../models/prix";
import Taxe from "../../../models/taxeTVA";

export default async ({ bodymen: { body }}, res, next) => {
    try {

        const direction = await Direction.findOne({ where: { id: parseInt(body.DirectionId)} }) ;
        if (direction == null){
            return res.sendUserError("Cette direction n'existe pas");
        }

        if (body.etat !== "En cours"){
            return res.sendUserError("Facture en edition")
        }


        const client = await Client.findOne({ where: { id: body.ClientId}})
        if(client == null){
            return res.sendUserError("Client non reconu!")
        }

        let facture = await Facture.create({
            DirectionId: direction.id,
            etat: body.etat,
            montantTotalHT: 0,
            montantTotalTaxe: 0,
            montantTotalTTC: 0,
            montantTotalRemise: 0,
            ClientId: client.id,
            remiseTotal: 0,
            tvaTotal: 0,
            adresseFacturation: body.adresseFacturation,
            adresseLivraison: body.adresseLivraison,
            personne: body.personne,
            solde: false,
            ProformaId: body.ProformaId
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

            const taxe = await Taxe.findOne({ where: {id: body.detailsSell[i].taxeId}})
            if(taxe == null){
                return res.sendUserError("Cette taxe est incorrect!")
            }

            let detailsElementDirection = [];
            detailsElementDirection[i] = await DetailsFacture.create({
                ArticleId: article.id,
                FactureId: facture.id,
                quantite: parseInt(body.detailsSell[i].quantite),
                prix: prix.intitule,
                TaxeId: taxe.id,
                remise: body.detailsSell[i].remise,
                montant: (parseInt(body.detailsSell[i].quantite) * prix.intitule),
            });

            await facture.update({
                montantTotalHT: facture.montantTotalHT + detailsElementDirection[i].montant
            });

            await facture.update({
                montantTotalTaxe: facture.montantTotalTaxe + ((facture.montantTotalHT * taxe.taux) / 100)
            });

            await facture.update({
                montantTotalRemise: facture.montantTotalRemise + ((facture.montantTotalHT * detailsElementDirection[i].remise) / 100)
            });
        }

        if(body.taxeTotal !== undefined){
            await facture.update({
                taxeTotal: parseInt(body.tvaTotal),
                remiseTotal: parseInt(body.remiseFixe),
                montantTotalTaxe: facture.montantTotalTaxe + ((facture.montantTotalHT * body.taxeTotal) / 100),
                montantTotalRemise: facture.montantTotalRemise + ((facture.montantTotalHT * body.remiseFixe) / 100)
            });
        }

        const date = new Date()

        if(body.reglementJour === 0 || body.reglementCash === true){
            await facture.update({
                refBS: "FACT" + "_" +facture.id + "-" + date.getFullYear(),
                reglementJour: 0,
                reglementCash: true,
                montantTotalTTC: facture.montantTotalHT + facture.montantTotalTaxe - facture.montantTotalRemise
            });

            return res.json({
                success: true,
                facture: facture
            });
        }


        await facture.update({
            refBS: "FACT" + "_" +facture.id + "-" + date.getFullYear(),
            reglementJour: body.reglementJour,
            reglementCash: false,
            montantTotalTTC: facture.montantTotalHT + facture.montantTotalTaxe - facture.montantTotalRemise
        });

        return res.json({
            success: true,
            facture: facture
        });


    } catch (error) {
        return next(error)
    }
}