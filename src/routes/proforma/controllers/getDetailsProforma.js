import Proforma from "../../../models/proforma";
import DetailsProforma from "../../../models/detailsProforma";

export default async ({ params }, res, next) => {
    try {

        let proforma = await Proforma.findOne({ where: ({id: params.id}) ,include: [{
                model: DetailsProforma,
                include:[{all: true, nest: true}]
            }]});
        if (proforma == null) {
            return res.sendUserError('Proforma incorrect.');
        }

        return res.json({
            succes: true,
            proforma: proforma
        })

    } catch (error) {
        return next(error)
    }

}