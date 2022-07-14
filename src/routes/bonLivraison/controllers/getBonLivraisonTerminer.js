import BonLivraison from "../../../models/bonLivraison";

export default async ({ params }, res, next) => {
    try {

        let bonLivraison = await BonLivraison.findAll({ where: ({etat: "Terminé"}) ,
            include:[{all: true, nest: true}]
        });
        if (bonLivraison == null) {
            return res.sendUserError('Bon Livraison incorrect.');
        }

        return res.json({
            succes: true,
            bonLivraison: bonLivraison
        })

    } catch (error) {
        return next(error)
    }

}