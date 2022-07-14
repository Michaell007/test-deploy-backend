import Proforma from "../../../models/proforma";
import DetailsProforma from "../../../models/detailsProforma";
import Client from "../../../models/client";


export default async ({ params }, res, next) => {
    try {

        let proforma = await Proforma.findAll({ where: ({ShowroomId: params.id}) ,include:[
                {
                    model: Client,
                    include: [{all: true, nest: true}]
                },
                {
                    model: DetailsProforma,
                    include: [{all: true, nest: true}]
                }
    ]});
        if (proforma == null) {
            return res.sendUserError('Showroom incorrect.');
        }

        return res.json({
            succes: true,
            proforma: proforma
        })

    } catch (error) {
        return next(error)
    }

}