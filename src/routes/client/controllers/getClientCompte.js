import Client from "../../../models/client";
import CompteClient from "../../../models/compteClient";

export default async ({ params }, res, next) => {
    try {

        let compteClient = await CompteClient.findOne({ where: ({ ClientId: params.id }), include: [
                {
                    model: Client,
                    include:[{all: true, nest: true}]
                }
            ]});
        if (compteClient == null) {
            return res.sendUserError('Nom de client incorrect.');
        }

        return res.json({
            succes: true,
            client: compteClient
        })

    } catch (error) {
        return next(error)
    }

}