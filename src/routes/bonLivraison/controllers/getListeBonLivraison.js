import DetailsBonLivraison from "../../../models/detailsBonLivraison";
import BonLivraison from "../../../models/bonLivraison";

export default async ({params},res, next) => {
    try {

        let liste = await BonLivraison.findAll({
            order: [['createdAt', 'DESC']],
            include:[{
                model: DetailsBonLivraison
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