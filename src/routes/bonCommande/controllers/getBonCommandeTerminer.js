import BonCommande from "../../../models/bonCommande";

export default async ({ params }, res, next) => {
    try {

        let bonCommande = await BonCommande.findAll({ where: ({etat: "Terminé"}) ,
            include:[{all: true, nest: true}]
        });
        if (bonCommande == null) {
            return res.sendUserError('Bon de commande incorrect.');
        }

        return res.json({
            succes: true,
            bonCommande: bonCommande
        })

    } catch (error) {
        return next(error)
    }

}