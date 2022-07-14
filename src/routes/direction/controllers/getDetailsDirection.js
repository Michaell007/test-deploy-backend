import Direction from "../../../models/direction";
import Showroom from "../../../models/showroom";
import StockDirection from "../../../models/stockDirection";
//import _ from "lodash";

export default async ({ params }, res, next) => {
    try {

        let direction = await Direction.findOne({ where: ({ id: params.id }), include: [{
            model: Showroom,
                include:[{all: true, nest: true}]
            }, {
            model: StockDirection,
                include:[{all: true, nest: true}]
            }]});
        if (direction == null) {
            return res.sendUserError('Nom de Direction incorrect.');
        }

        return res.json({
            succes: true,
            direction: direction
        })

    } catch (error) {
        return next(error)
    }

}