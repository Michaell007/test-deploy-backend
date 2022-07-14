import CategoryArticle from "../../../models/categoryArticle";
import Article from "../../../models/article";

export default async ({ params }, res, next) => {
    try {

        let category = await CategoryArticle.findOne({ where: ({ id: params.id }), include: [{
                model: Article,
                include:[{all: true, nest: true}]
            }]});
        if (category == null) {
            return res.sendUserError("Nom categorie de l'article incorrect.");
        }

        return res.json({
            succes: true,
            category: category
        })

    } catch (error) {
        return next(error)
    }

}