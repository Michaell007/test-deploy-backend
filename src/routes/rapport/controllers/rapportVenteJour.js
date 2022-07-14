import Payement from "../../../models/payement";
import Facture from "../../../models/facture";

export default async ({params},res, next) => {
    try {

        let liste = await Payement.findAll({
            include:[{
                model: Facture
            }]
        });

        let objlist = [];

        // moment(item.createdAt).format("DD-MM-Y")

        return res.json({
            succes: true,
            details: liste
        })

    } catch (error) {
        return next(error)
    }

}