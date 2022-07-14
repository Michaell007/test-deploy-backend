import Client from "../../../models/client";

export default async ({ params }, res, next) => {
    try {

        let client = await Client.findOne({ where: { id: params.id } });
        if (client == null) {
            return res.sendUserError("Nom de Client incorrect.");
        }

        // delete model
        await Client.destroy({ where: { id: params.id } });

        // reload liste
        const liste = await Client.findAll({});

        return res.json({
            succes: true,
            results: liste
        })

    } catch (error) {
        return next(error)
    }

}