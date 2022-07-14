import CompteBanque from "../../../models/compteBanque";
import Direction from "../../../models/direction";

export default async ({ params }, res, next) => {
    try {

        let compte = await CompteBanque.findOne({ where: ({ id: params.id }), include: [{
                model: Direction,
                include:[{all: true, nest: true}]
            }]});
        if (compte == null) {
            return res.sendUserError("Nom Compte de Direction incorrect.");
        }

        return res.json({
            succes: true,
            compte: compte
        })

    } catch (error) {
        return next(error)
    }

}