import Payement from "../../../models/payement";

export default async ({ params }, res, next) => {
    try {

        let payement = await Payement.findOne({ where: { id: params.id } });
        if (payement == null) {
            return res.sendUserError("Payement incorrect.");
        }


        if (payement.etat === "Terminé"){
            return res.sendUserError("Impossible! Payement est deja terminé")
        }
        // delete model

        await Payement.destroy({ where: { id: params.id } });

        // reload liste
        const liste = await Payement.findAll({});

        return res.json({
            succes: true,
            results: liste
        })

    } catch (error) {
        return next(error)
    }

}