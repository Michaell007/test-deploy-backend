import Pays from "../../../models/pays";

export default async ({ params }, res, next) => {
    try {

        let pays = await Pays.findOne({ where: { id: params.id } });
        if (pays == null) {
            return res.sendUserError("Nom de Pays incorrect.");
        }

        // delete model
        await Pays.destroy({ where: { id: params.id } });

        // reload liste
        const liste = await Pays.findAll({});

        return res.json({
            succes: true,
            results: liste
        })

    } catch (error) {
        return next(error)
    }

}