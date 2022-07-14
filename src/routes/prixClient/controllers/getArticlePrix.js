import PrixClient from "../../../models/prix";
import CategoryClient from "../../../models/categoryClient";
import Article from "../../../models/article";

export default async ({ params }, res, next) => {
    try {

        let prixClient = await PrixClient.findOne({ where: ({ CategoryClientId: params.CategoryClientId, ArticleId: params.ArticleId }), include: [
                {
                    model: CategoryClient,
                    include:[{all: true, nest: true}]
                },
                {
                    model: Article,
                    include:[{all: true, nest: true}]
                }

            ]});
        if (prixClient == null) {
            return res.sendUserError('Nom de prixClient incorrect.');
        }

        return res.json({
            succes: true,
            prixClient: prixClient
        })

    } catch (error) {
        return next(error)
    }

}