import Facture from "../../../models/facture";
import DetailsFacture from "../../../models/detailsFacture";

export default async ({ params }, res, next) => {
    try {

        let facture = await Facture.findOne({ where: { id: params.id } });
        if (facture == null) {
            return res.sendUserError("Facture incorrect.");
        }


        if (facture.etat === "Terminé"){
            return res.sendUserError("Impossible! Facture est deja terminé")
        }
        // delete model

        await Facture.destroy({ where: { id: params.id } });

        await DetailsFacture.destroy({ where: { FactureId: facture.id }})

        // reload liste
        const liste = await Facture.findAll({});

        return res.json({
            succes: true,
            results: liste
        })

    } catch (error) {
        return next(error)
    }

}