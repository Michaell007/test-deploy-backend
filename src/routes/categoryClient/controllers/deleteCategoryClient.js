import CategoryClient from "../../../models/categoryClient";
import Client from "../../../models/client";

export default async ({ params }, res, next) => {
    try {

        let categories = await CategoryClient.findOne({ where: { id: params.id } });
        if (categories == null) {
            return res.sendUserError("Categorie d'Client incorrect.");
        }

        let clients = await Client.findAll({where: { CategoryClientId: categories.id}})

        if (clients !== [] || clients !== null){
            return res.sendUserError("Impossible! Cette categorie contient des éléments.");
        }

        // delete model
        await CategoryClient.destroy({ where: { id: params.id } });

        // reload liste
        const liste = await CategoryClient.findAll({});

        return res.json({
            succes: true,
            results: liste
        })

    } catch (error) {
        return next(error)
    }

}