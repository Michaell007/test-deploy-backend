import BonProvision from "../../../models/bonProvision";
import DetailsBonProvision from "../../../models/detailsBonProvision";

export default async ({ params }, res, next) => {
    try {

        let bonProvision = await BonProvision.findOne({ where: ({id: params.id}) ,include: [{
                model: DetailsBonProvision,
                include:[{all: true, nest: true}]
            }]});
        if (bonProvision == null) {
            return res.sendUserError("Bon d'approvisionnement incorrect.");
        }

        return res.json({
            succes: true,
            bonProvision: bonProvision
        })

    } catch (error) {
        return next(error)
    }

}