import Facture from "../../../models/facture";
import Client from "../../../models/client";

export default async ({ params }, res, next) => {
    try {

        let factures = await Facture.findAll({ where: ({solde: false}) ,include: [{
                model: Client,
                // include:[{all: true, nest: true}]
            }]});
        if (factures == null) {
            return res.sendUserError('Facture incorrect.');
        }

        return res.json({
            succes: true,
            facture: factures
        })

    } catch (error) {
        return next(error)
    }

}