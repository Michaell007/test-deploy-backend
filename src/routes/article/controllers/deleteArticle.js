import Article from "../../../models/article";
import Stock from "../../../models/stock";

export default async ({ params }, res, next) => {
    try {

        let article = await Article.findOne({ where: { id: params.id } });
        if (article == null) {
            return res.sendUserError("Article incorrect.");
        }

        let stocks = await Stock.findAll({ where: {ArticleId: articles.id}})

        if(stocks === [] || stocks == null){
            // delete model
            await Article.destroy({ where: { id: params.id } });
        }
        else{
            return res.sendUserError("Stock existant ! Impossible de supprimer cet article...");
        }

        // reload liste
        const liste = await Article.findAll({});

        return res.json({
            succes: true,
            results: liste
        })

    } catch (error) {
        return next(error)
    }

}