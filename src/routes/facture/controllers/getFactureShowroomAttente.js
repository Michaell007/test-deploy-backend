import Facture from "../../../models/facture";
import Client from "../../../models/client";
import DetailsFacture from "../../../models/detailsFacture";
import Proforma from "../../../models/proforma";

export default async ({ params }, res, next) => {
    try {

        let facture = await Facture.findAll({ where: ({ShowroomId: params.id ,etat: "En Attente"}) ,
            include:[
                {
                    model: Client,
                    include: [{all: true, nest: true}]
                },
                {
                    model: DetailsFacture,
                    include: [{all: true, nest: true}]
                },
                {
                    model: Proforma,
                    include: [{all: true, nest: true}]
                }
            ]
        });
        if (facture == null) {
            return res.sendUserError('Facture incorrect.');
        }

        return res.json({
            succes: true,
            facture: facture
        })

    } catch (error) {
        return next(error)
    }

}