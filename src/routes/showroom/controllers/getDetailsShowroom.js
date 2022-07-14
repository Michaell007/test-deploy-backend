import Showroom from "../../../models/showroom";
import Stock from "../../../models/stock";
import User from "../../../models/user";
//import _ from "lodash";

export default async ({ params }, res, next) => {
    try {

        let showroom = await Showroom.findOne({ where: ({ id: params.id }),
            include: [{
                model: Stock,
                include:[{all: true, nest: true}]
            },
                {
                    model: User,
                    include:[{all: true, nest: true}]
                }
            ]});
        if (showroom == null) {
            return res.sendUserError('Nom de showroom incorrect.');
        }

        return res.json({
            succes: true,
            showroom: showroom
        })

    } catch (error) {
        return next(error)
    }

}