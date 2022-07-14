import Client from "../../../models/client";
import CategoryClient from "../../../models/categoryClient";
import ParametreClient from "../../../models/parametreClient";
import CompteClient from "../../../models/compteClient";

export default async ({ params }, res, next) => {
    try {

        let client = await Client.findOne({ where: ({ id: params.id }), include: [
            {
                model: CategoryClient,
                include:[{all: true, nest: true}]
            },
                {
                    model: ParametreClient,
                    include:[{all: true, nest: true}]
                },
                {
                    model: CompteClient,
                    include:[{all: true, nest: true}]
                }
            ]});
        if (client == null) {
            return res.sendUserError('Nom de client incorrect.');
        }

        return res.json({
            succes: true,
            client: client
        })

    } catch (error) {
        return next(error)
    }

}