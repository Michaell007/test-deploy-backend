import BonEntree from "../../../models/bonEntree";
import Showroom from "../../../models/showroom";
import DetailsBonEntree from "../../../models/detailsBonEntree";
import BonSortieInterne from "../../../models/bonSortieInterne";

export default async ({ params }, res, next) => {
    try {

        let bonEntree = await BonEntree.findAll({ where: ({etat: "Terminé"}) ,
            include:[{
                model: Showroom
            },{
                model: DetailsBonEntree
            },
                {
                    model: BonSortieInterne
                }]
        });
        if (bonEntree == null) {
            return res.sendUserError('Bon de commande incorrect.');
        }

        return res.json({
            succes: true,
            bonEntree: bonEntree
        })

    } catch (error) {
        return next(error)
    }

}