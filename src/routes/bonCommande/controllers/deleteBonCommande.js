import BonCommande from "../../../models/bonCommande";
import DetailsBonCommande from "../../../models/detailsBonCommande";

export default async ({ params }, res, next) => {
    try {

        let bonCommande = await BonCommande.findOne({ where: { id: params.id } });
        if (bonCommande == null) {
            return res.sendUserError("Bon commande incorrect.");
        }


        if (bonCommande.etat === "Terminé"){
            return res.sendUserError("Impossible! Ce bon de commande est deja terminé")
        }
        // delete model

        await BonCommande.destroy({ where: { id: params.id } });

        await DetailsBonCommande.destroy({ where: { BonCommandeId: bonCommande.id }})

        // reload liste
        const liste = await BonCommande.findAll({});

        return res.json({
            succes: true,
            results: liste
        })

    } catch (error) {
        return next(error)
    }

}