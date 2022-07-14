import Payement from "../../../models/payement";
import Facture from "../../../models/facture";

export default async ({params},res, next) => {
    try {

        let liste = await Payement.findAll({
            order: [['createdAt', 'DESC']],
            include:[{
                model: Facture
            }]
        });

        return res.json({
            succes: true,
            details: liste
        })

    } catch (error) {
        return next(error)
    }

}