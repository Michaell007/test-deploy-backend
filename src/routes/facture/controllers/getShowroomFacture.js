import Facture from "../../../models/facture";
import DetailsFacture from "../../../models/detailsFacture";
import Client from "../../../models/client";

export default async ({ params }, res, next) => {
    try {

        let facture = await Facture.findAll({ where: ({ShowroomId: params.id}) ,
            include:[
                {
                    model: Client,
                    include: [{all: true, nest: true}]
                },
                {
                    model: DetailsFacture,
                    include: [{all: true, nest: true}]
                }
            ]
        });
        if (facture == null) {
            return res.sendUserError('Showroom incorrect.');
        }

        return res.json({
            succes: true,
            facture: facture
        })

    } catch (error) {
        return next(error)
    }

}