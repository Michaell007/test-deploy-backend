import BonLivraison from "../../../models/bonLivraison";
import DetailsBonLivraison from "../../../models/detailsBonLivraison";

export default async ({ params }, res, next) => {
    try {

        let bonLivraison = await BonLivraison.findOne({ where: { id: params.id } });
        if (bonLivraison == null) {
            return res.sendUserError("Bon Livraison incorrect.");
        }


        if (bonLivraison.etat === "Terminé"){
            return res.sendUserError("Impossible! Bon Livraison est deja terminé")
        }
        // delete model

        await BonLivraison.destroy({ where: { id: params.id } });

        await DetailsBonLivraison.destroy({ where: { BonLivraisonId: bonLivraison.id }})

        // reload liste
        const liste = await BonLivraison.findAll({});

        return res.json({
            succes: true,
            results: liste
        })

    } catch (error) {
        return next(error)
    }

}