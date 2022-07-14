import DetailsDon from "../../../models/detailsDon";
import DetailsBonReception from "../../../models/detailsBonReception";
import BonReception from "../../../models/bonReception";

export default async ({ params }, res, next) => {
    try {

        let bonReception = await BonReception.findOne({ where: ({id: params.id}) ,include: [{
                model: DetailsBonReception,
                include:[{all: true, nest: true}]
            },
                {
                    model: DetailsDon,
                    include:[{all: true, nest: true}]
                }]});
        if (bonReception == null) {
            return res.sendUserError('Entrée incorrect.');
        }

        return res.json({
            succes: true,
            bonReception: bonReception
        })

    } catch (error) {
        return next(error)
    }

}