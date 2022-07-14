import CaisseDirection from "../../../models/caisseDirection";
import Showroom from "../../../models/showroom";
//import _ from "lodash";

export default async ({ params }, res, next) => {
    try {

        let caisse = await CaisseDirection.findOne({ where: ({ ShowroomId: params.id }), include: [{
                model: Showroom,
                include:[{all: true, nest: true}]
            }]});
        if (caisse == null) {
            return res.sendUserError('Nom de Showroom incorrect.');
        }

        return res.json({
            succes: true,
            caisse: caisse
        })

    } catch (error) {
        return next(error)
    }

}