import Taxe from "../../../models/taxeTVA";

export default async ({ params }, res, next) => {
    try {

        let taxeTVA = await Taxe.findOne({ where: { id: params.id } });
        if (taxeTVA == null) {
            return res.sendUserError("Nom de Taxe incorrect.");
        }

        // delete model
        await Taxe.destroy({ where: { id: params.id } });

        // reload liste
        const liste = await Taxe.findAll({});

        return res.json({
            succes: true,
            results: liste
        })

    } catch (error) {
        return next(error)
    }

}