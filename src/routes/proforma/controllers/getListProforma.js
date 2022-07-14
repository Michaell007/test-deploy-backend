import Proforma from "../../../models/proforma";
import DetailsProforma from "../../../models/detailsProforma";
import Client from "../../../models/client";
export default async ({params},res, next) => {
    try {
        let liste = await Proforma.findAll({
            order: [['createdAt', 'DESC']],
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

        return res.json({
            succes: true,
            details: liste
        })

    } catch (error) {
        return next(error)
    }

}