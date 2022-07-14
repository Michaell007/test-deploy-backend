import CategoryClient from "../../../models/categoryClient";
import Client from "../../../models/client";

export default async ({params} ,res, next) => {
    try {

        let liste = await CategoryClient.findAll({
            order: [['createdAt', 'DESC']]
            ,include: [{
                model: Client
            }]
        });

        return res.json({
            succes: true,
            details: liste
        })

    } catch (error) {
        return next(error)
    }

}