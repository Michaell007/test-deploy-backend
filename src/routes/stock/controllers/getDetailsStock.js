import Stock from "../../../models/stock";
import Showroom from "../../../models/showroom";
import Article from "../../../models/article";
//import _ from "lodash";

export default async ({ params }, res, next) => {
    try {
        let stock = await Stock.findOne({ where: ({ShowroomId: params.id}) ,include: [{
                model: Showroom,
                include:[{all: true, nest: true}]
            },
                {
                    model: Article,
                    include:[{all: true, nest: true}]
                }]});
        if (stock == null) {
            return res.sendUserError('Nom de showroom incorrect.');
        }

        return res.json({
            succes: true,
            stock: stock
        })

    } catch (error) {
        return next(error)
    }

}