import DetailsBonEntree from "../../../models/detailsBonEntree";
import BonEntree from "../../../models/bonEntree";
import BonSortieInterne from "../../../models/bonSortieInterne";
import Showroom from "../../../models/showroom";

export default async ({params},res, next) => {
    try {

        let liste = await BonEntree.findAll({
            order: [['createdAt', 'DESC']],
            include:[{
                model: Showroom
            },{
                model: DetailsBonEntree
            },
                {
                    model: BonSortieInterne
                }]
        });
        if(liste == null){
            return res.sendUserError("Erreur... ! ")
        }
        return res.json({
            succes: true,
            details: liste
        })

    } catch (error) {
        return next(error)
    }

}