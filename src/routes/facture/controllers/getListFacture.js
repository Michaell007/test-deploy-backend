import DetailsFacture from "../../../models/detailsFacture";
import Facture from "../../../models/facture";
import Client from "../../../models/client";

export default async ({params},res, next) => {
    try {

        let liste = await Facture.findAll({
            order: [['createdAt', 'DESC']],
            include:[
                {
                    model: Client
                },
                {
                    model: DetailsFacture
                }
            ]
        });

        return res.json({
            succes: true,
            details: liste
        })

    } catch (error) {
        return next(error)
    }

}