import DetailsBonReception from "../../../models/detailsBonReception";
import BonReception from "../../../models/bonReception";

export default async ({params},res, next) => {
    try {

        let liste = await BonReception.findAll({
            order: [['createdAt', 'DESC']],
            include:[{
                model: DetailsBonReception
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