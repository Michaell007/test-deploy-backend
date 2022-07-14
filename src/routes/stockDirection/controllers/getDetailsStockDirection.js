import Article from "../../../models/article";
import StockDirection from "../../../models/stockDirection";
import Direction from "../../../models/direction";


export default async ({ params }, res, next) => {
    try {

        let stockDirection = await StockDirection.findOne({ where:
                ({ id: params.id }),
            include:[{
                    model: Direction,
                    include:[{all: true, nest: true}],
                },{
                    model: Article,
                    include:[{all: true, nest: true}],
                }]
        });
        if (stockDirection == null) {
            return res.sendUserError('Nom de Stock de Direction incorrect.');
        }

        return res.json({
            succes: true,
            stockDirection: stockDirection
        })

    } catch (error) {
        return next(error)
    }

}