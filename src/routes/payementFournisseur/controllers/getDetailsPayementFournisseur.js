import Payement from "../../../models/payement";
import Facture from "../../../models/facture";

export default async ({ params }, res, next) => {
    try {

        let payement = await Payement.findOne({ where: ({id: params.id}) ,include: [{
                model: Facture,
                include:[{all: true, nest: true}]
            }]});
        if (payement == null) {
            return res.sendUserError('Payement incorrect.');
        }

        return res.json({
            succes: true,
            payement: payement
        })

    } catch (error) {
        return next(error)
    }

}