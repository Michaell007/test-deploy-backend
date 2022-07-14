import CategoryArticle from "../../../models/categoryArticle";
import Article from "../../../models/article";

export default async ({params} ,res, next) => {
    try {

        let liste = await CategoryArticle.findAll({
            order: [['createdAt', 'DESC']]
            ,include: [{
                model: Article
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