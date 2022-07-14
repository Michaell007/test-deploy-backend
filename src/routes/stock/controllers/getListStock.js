import Stock from "../../../models/stock";
import Showroom from "../../../models/showroom";
import Article from "../../../models/article";

export default async ({params},res, next) => {
    try {

        let liste = await Stock.findAll({
            order: [['createdAt', 'DESC']],
            include: [{
                model: Showroom
            },
                {
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