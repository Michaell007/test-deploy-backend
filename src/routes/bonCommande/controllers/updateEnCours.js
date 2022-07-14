import BonCommande from "../../../models/bonCommande";
import Article from "../../../models/article";
import DetailsBonCommande from "../../../models/detailsBonCommande";

export default async ({ body, params }, res, next) => {
    try {
        const bonCommandeEnCours = await BonCommande.findOne({where: {id: params.id}})
        if (bonCommandeEnCours == null){
            return res.sendUserError("Bon commande incorrect");
        }

        if (bonCommandeEnCours.etat === "Terminé") {
            return res.sendUserError("Impossible! Bon déjà terminé");
        }
        let detailCommandeEncours = await DetailsBonCommande.findAll({ where: { BonCommandeId: bonCommandeEnCours.id}});
        if(detailCommandeEncours == null){
            return res.sendUserError("Aucun detail pour ce bon de commande");
        }
        for (let i = 0; i < body.detailsEntries.length; i++) {
            const article = await Article.findOne({where: {id: parseInt(body.detailsEntries[i].ArticleId)}});
            if (article == null){
                return res.sendUserError("Cet article n'existe pas")
            }

            await detailCommandeEncours[i].update({
                ArticleId: body.detailsEntries[i].ArticleId,
                quantite: parseInt(body.detailsEntries[i].quantite),
                montant: parseInt(body.detailsEntries[i].quantite) * detailCommandeEncours[i].prix
            })
            await bonCommandeEnCours.update({
                montantTotal: bonCommandeEnCours.montantTotal + detailCommandeEncours[i].montant
            })
        }

        await bonCommandeEnCours.update({
            etat: "En cours",
        })

        return res.json({
            success: true,
            bonCommande: bonCommandeEnCours
        })


    } catch (error) {
        return next(error)
    }
}