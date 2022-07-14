import BonProvision from "../../../models/bonProvision";
import DetailsBonProvision from "../../../models/detailsBonProvision";

export default async ({ params }, res, next) => {
    try {

        let bonProvision = await BonProvision.findOne({ where: { id: params.id } });
        if (bonProvision == null) {
            return res.sendUserError("Bon commande incorrect.");
        }


        if (bonProvision.etat === "Terminé"){
            return res.sendUserError("Impossible! Ce bon d'approvisionnement est deja terminé")
        }
        // delete model

        await BonProvision.destroy({ where: { id: params.id } });

        await DetailsBonProvision.destroy({ where: { BonProvisionId: bonProvision.id }})

        // reload liste
        const liste = await BonProvision.findAll({});

        return res.json({
            succes: true,
            results: liste
        })

    } catch (error) {
        return next(error)
    }

}