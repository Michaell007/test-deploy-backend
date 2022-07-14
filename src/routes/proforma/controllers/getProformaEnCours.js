import Proforma from "../../../models/proforma";
import DetailsProforma from "../../../models/detailsProforma";
import Client from "../../../models/client";
export default async ({ params }, res, next) => {
    try {

        let proforma = await Proforma.findAll({ where: ({DirectionId: params.id, etat: "En cours"}) ,
            include:[
                {
                    model: Client,
                    include: [{all: true, nest: true}]
                },
                {
                    model: DetailsProforma,
                    include: [{all: true, nest: true}]
                }
            ]
        });
        if (proforma == null) {
            return res.sendUserError('Bon de commande incorrect.');
        }

        return res.json({
            succes: true,
            proforma: proforma
        })

    } catch (error) {
        return next(error)
    }

}