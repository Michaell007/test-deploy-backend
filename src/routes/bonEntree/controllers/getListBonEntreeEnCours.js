import BonEntree from "../../../models/bonEntree";
import DetailsBonEntree from "../../../models/detailsBonEntree";
import BonSortieInterne from "../../../models/bonSortieInterne";
import Showroom from "../../../models/showroom";

export default async ({ params }, res, next) => {
    try {

        let bonEntree = await BonEntree.findAll({ where: ({etat: "En Attente"}) ,
            include:[
                {
                    model: Showroom
                },{
                model: DetailsBonEntree
            },
                {
                    model: BonSortieInterne
                }]
        });
        if (bonEntree == null) {
            return res.sendUserError("Bon d'entrée incorrect.");
        }

        return res.json({
            succes: true,
            bonEntree: bonEntree
        })

    } catch (error) {
        return next(error)
    }

}