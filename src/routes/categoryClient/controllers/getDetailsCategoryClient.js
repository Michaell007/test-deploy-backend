import CategoryClient from "../../../models/categoryClient";
import Client from "../../../models/client";

export default async ({ params }, res, next) => {
    try {

        let category = await CategoryClient.findOne({ where: ({ id: params.id }), include: [{
                model: Client,
                include:[{all: true, nest: true}]
            }]});
        if (category == null) {
            return res.sendUserError("Nom categorie de Client incorrect.");
        }

        return res.json({
            succes: true,
            category: category
        })

    } catch (error) {
        return next(error)
    }

}