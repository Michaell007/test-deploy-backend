import Direction from "../../../models/direction";
import CaisseDirection from "../../../models/caisseDirection";
//import _ from "lodash";

export default async ({ params }, res, next) => {
    try {

        let caisse = await CaisseDirection.findOne({ where: ({ DirectionId: params.id }), include: [{
                model: Direction,
                include:[{all: true, nest: true}]
            }]});
        if (caisse == null) {
            return res.sendUserError('Nom de Direction incorrect.');
        }

        return res.json({
            succes: true,
            caisse: caisse
        })

    } catch (error) {
        return next(error)
    }

}