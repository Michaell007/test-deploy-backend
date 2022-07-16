import BonSortieInterne from "../../../models/bonSortieInterne";
import DetailsBonSortieInterne from "../../../models/detailsBonSortieInterne";
//import _ from "lodash";

export default async ({ params }, res, next) => {
    try {

        let bonSortieInterne = await BonSortieInterne.findOne({ where: ({ id: params.id }),
            include: [{
                model: DetailsBonSortieInterne,
                include:[{all: true, nest: true}]
            }]
        });
        if (BonSortieInterne == null) {
            return res.sendUserError('Bon Sortie Interne incorrect.');
        }

        return res.json({
            succes: true,
            bonSortieInterne: bonSortieInterne
        })

    } catch (error) {
        return next(error)
    }

}