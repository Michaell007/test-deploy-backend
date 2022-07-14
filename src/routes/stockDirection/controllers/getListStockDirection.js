import StockDirection from "../../../models/stockDirection";
import Direction from "../../../models/direction";
import Article from "../../../models/article";

export default async ({params},res, next) => {
    try {

        let liste = await StockDirection.findAll({
            order: [['createdAt', 'DESC']],
            include:[{
                model: Direction
            },{
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