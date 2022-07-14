import BonProvision from "../../../models/bonProvision";
import Article from "../../../models/article";
import DetailsBonProvision from "../../../models/detailsBonProvision";

export default async ({ body, params }, res, next) => {
    try {
        const bonProvisionEnCours = await BonProvision.findOne({where: {id: params.id}})
        if (bonProvisionEnCours == null){
            return res.sendUserError("Bon commande incorrect");
        }

        if (bonProvisionEnCours.etat === "Terminé") {
            return res.sendUserError("Impossible! Bon déjà terminé");
        }
        let detailProvisionEncours = await DetailsBonProvision.findAll({ where: { BonProvisionId: bonProvisionEnCours.id}});
        if(detailProvisionEncours == null){
            return res.sendUserError("Aucun detail pour ce bon de commande");
        }
        for (let i = 0; i < body.detailsEntries.length; i++) {
            const article = await Article.findOne({where: {id: parseInt(body.detailsEntries[i].ArticleId)}});
            if (article == null){
                return res.sendUserError("Cet article n'existe pas")
            }

            await detailProvisionEncours[i].update({
                ArticleId: body.detailsEntries[i].ArticleId,
                quantite: parseInt(body.detailsEntries[i].quantite),
                montant: parseInt(body.detailsEntries[i].quantite) * detailProvisionEncours[i].prix
            })
            await bonProvisionEnCours.update({
                montantTotal: bonProvisionEnCours.montantTotal + detailProvisionEncours[i].montant
            })
        }

        await bonProvisionEnCours.update({
            etat: "En cours",
        })

        return res.json({
            success: true,
            bonProvision: bonProvisionEnCours
        })


    } catch (error) {
        return next(error)
    }
}