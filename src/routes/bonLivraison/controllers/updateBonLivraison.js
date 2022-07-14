/*
import Article from "../../../models/article";
import PrixClient from "../../../models/prix";
import TaxeTVA from "../../../models/taxeTVA";
import Proforma from "../../../models/proforma";
import BonLivraison from "../../../models/bonLivraison";
import DetailsBonLivraison from "../../../models/detailsBonLivraison";

export default async ({ body, params }, res, next) => {
    try {
        const bonLivraison = await BonLivraison.findOne({ where: { id: params.id}}) ;
        if (bonLivraison == null){
            return res.sendUserError("Cet BonLivraison n'existe pas");
        }

        const proforma = await Proforma.findOne({ where: { id: facture.ProformaId}}) ;
        if (proforma == null){
            return res.sendUserError("Cette proforma n'existe pas");
        }

        if (body.etat !== "Terminé"){
            return res.sendUserError("BonLivraison en edition")
        }

        if(proforma.validateByDG !== false){
            return res.sendUserError("En attende de la validation de la direction")
        }

        if(facture.payementMode === "cash"){
            return res.sendUserError("Impossible...!")
        }

        let detailsBonLivraisons = await DetailsBonLivraison.findAll({ where: { BonLivraisonId: facture.id}})
        if(detailsBonLivraisons == null){
            return res.sendUserError("Aucun detail associé a cette BonLivraison")
        }

        facture.update({
            remiseTotal: body.remiseFixe,
            taxeTotal: body.tvaTotal,
            adresseFacturation: body.adresseFacturation,
            adresseLivraison: body.adresseLivraison,
            personne: body.personne,
            reglementJour: body.reglementJour,
            reglementCash: false,
            //UserId:
        });

        let bonLivraison = await BonLivraison.create({
            DirectionId: proforma.DirectionId,
            etat: "En Attente",
            ClientId: facture.ClientId,
            adresseLivraison: facture.adresseLivraison,
            quantiteTotal: 0
            //UserId:
        });

        //Création de detail Entrée
        for (let i = 0; i < detailsBonLivraisons.length; i++) {
            const article = await Article.findOne({where: {id: parseInt(body.detailsSell[i].ArticleId)}});
            if (article == null){
                return res.sendUserError("Cet article n'existe pas")
            }

            const prix = await PrixClient.findOne({ where: { CategoryClientId: client.CategoryClientId, ArticleId: article.id}});
            if(prix == null){
                return res.sendUserError("Prix non disponible pour ce article")
            }

            const taxe = await TaxeTVA.findOne({ where: {id: body.detailsSell[i].taxeId}})
            if(taxe == null){
                return res.sendUserError("Cette taxe est incorrect!")
            }

            await detailsBonLivraisons[i].update({
                ArticleId: article.id,
                BonLivraisonId: facture.id,
                quantite: parseInt(body.detailsSell[i].quantite),
                prix: prix.intitule,
                TaxeTVAId: taxe.id,
                remise: body.detailsSell[i].remise,
                montant: (parseInt(body.detailsSell[i].quantite) * prix.intitule),
            });

            let detailsLivraisonDirection = [];
            detailsLivraisonDirection[i] = await DetailsBonLivraison.create({
                ArticleId: article.id,
                BonLivraisonId: bonLivraison.id,
                quantite: parseInt(body.detailsSell[i].quantite),
                prix: prix.intitule,
                montant: (parseInt(body.detailsSell[i].quantite) * prix.intitule),
            });

            await facture.update({
                montantTotalHT: facture.montantTotalHT + detailsBonLivraisons[i].montant
            });

            await bonLivraison.update({
                quantiteTotal: bonLivraison.quantiteTotal + detailsLivraisonDirection[i].quantite
            });

            await facture.update({
                montantTotalTaxe: facture.montantTotalTaxe + ((facture.montantTotalHT * taxe.taux) / 100)
            });

            await facture.update({
                montantTotalRemise: facture.montantTotalRemise + ((facture.montantTotalHT * detailsBonLivraisons[i].remise) / 100)
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
        await facture.update({
            montantTotalTTC: facture.montantTotalHT + facture.montantTotalTaxe - facture.montantTotalRemise
        });

        await bonLivraison.update({
            montantTotal: facture.montantTotalTTC
        });

        await proforma.update({
            etat: "Terminé"
        });

        return res.json({
            success: true,
            facture: facture
        });


    } catch (error) {
        return next(error)
    }
}*/
