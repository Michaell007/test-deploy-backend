import Client from "../../../models/client";
import ParametreClient from "../../../models/parametreClient";

export default async ({ params }, res, next) => {
    try {

        let paramsClient = await ParametreClient.findOne({ where: ({ ClientId: params.id }), include: [
                {
                    model: Client,
                    include:[{all: true, nest: true}]
                }
            ]});
        if (paramsClient == null) {
            return res.sendUserError('Nom de client incorrect.');
        }

        return res.json({
            succes: true,
            client: paramsClient
        })

    } catch (error) {
        return next(error)
    }

}