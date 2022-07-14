import Pays from "../../../models/pays";
import Direction from "../../../models/direction";
import StockDirection from "../../../models/stockDirection";

export default async ({params},res, next) => {
    try {

        let liste = await Direction.findAll({
            order: [['createdAt', 'DESC']],
            include:[{
                model: Pays
            }, {
                model: StockDirection
            }]});

        return res.json({
            succes: true,
            details: liste
        })

    } catch (error) {
        return next(error)
    }

}