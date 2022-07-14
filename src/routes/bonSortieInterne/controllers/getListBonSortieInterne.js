import DetailsBonSortieInterne from "../../../models/detailsBonSortieInterne";
import BonSortieInterne from "../../../models/bonSortieInterne";
import BonProvision from "../../../models/bonProvision";

export default async ({params},res, next) => {
    try {

        let liste = await BonSortieInterne.findAll({
            order: [['createdAt', 'DESC']],
            include:[{
                model: DetailsBonSortieInterne
            },
                {
                    model: BonProvision
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
