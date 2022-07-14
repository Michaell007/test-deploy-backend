import Article from "../../../models/article";
import CategoryArticle from "../../../models/categoryArticle";

export default async ({params},res, next) => {
    try {

        let liste = await Article.findAll({
            order: [['createdAt', 'DESC']]
            ,include:[{
                model: CategoryArticle,
                as: "CategoryArticle"
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