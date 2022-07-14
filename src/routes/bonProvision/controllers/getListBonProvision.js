import DetailsBonProvision from "../../../models/detailsBonProvision";
import BonProvision from "../../../models/bonProvision";

export default async ({params},res, next) => {
    try {

        let liste = await BonProvision.findAll({
            order: [['createdAt', 'DESC']],
            include:[{
                model: DetailsBonProvision
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