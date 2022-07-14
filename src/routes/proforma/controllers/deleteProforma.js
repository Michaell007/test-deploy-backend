import Proforma from "../../../models/proforma";
import DetailsProforma from "../../../models/detailsProforma";

export default async ({ params }, res, next) => {
    try {

        let proforma = await Proforma.findOne({ where: { id: params.id } });
        if (proforma == null) {
            return res.sendUserError("Proforma incorrect.");
        }


        if (proforma.etat === "Terminé"){
            return res.sendUserError("Impossible! Proforma est deja terminé")
        }
        // delete model

        await Proforma.destroy({ where: { id: params.id } });

        await DetailsProforma.destroy({ where: { ProformaId: proforma.id }})

        // reload liste
        const liste = await Proforma.findAll({});

        return res.json({
            succes: true,
            results: liste
        })

    } catch (error) {
        return next(error)
    }

}