import CategoryArticle from "../../../models/categoryArticle";
import Article from "../../../models/article";

export default async ({ params }, res, next) => {
    try {

        let categories = await CategoryArticle.findOne({ where: { id: params.id } });
        if (categories == null) {
            return res.sendUserError("Categorie d'article incorrect.");
        }

        let articles = await Article.findAll({where: { CategoryArticleId: categories.id}})

        if (articles !== [] || articles !== null){
            return res.sendUserError("Impossible! Cette categorie contient des éléments.");
        }

        // delete model
        await CategoryArticle.destroy({ where: { id: params.id } });

        // reload liste
        const liste = await CategoryArticle.findAll({});

        return res.json({
            succes: true,
            results: liste
        })

    } catch (error) {
        return next(error)
    }

}