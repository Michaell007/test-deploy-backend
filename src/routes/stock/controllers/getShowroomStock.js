import Stock from "../../../models/stock";
import Article from "../../../models/article";
import Showroom from "../../../models/showroom";

export default async ({ params }, res, next) => {
    try {

        let stock = await Stock.findAll({ where: ({ShowroomId: params.id}) ,include: [{
                model: Showroom,
                include:[{all: true, nest: true}]
            },
                {
                    model: Article,
                    as: "Article"
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