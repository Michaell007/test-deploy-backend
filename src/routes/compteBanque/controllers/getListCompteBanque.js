import CompteBanque from "../../../models/compteBanque";
import Direction from "../../../models/direction";

export default async ({params} ,res, next) => {
    try {

        let liste = await CompteBanque.findAll({
            order: [['createdAt', 'DESC']]
            ,include: [{
                model: Direction
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