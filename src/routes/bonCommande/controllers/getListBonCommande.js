import DetailsBonCommande from "../../../models/detailsBonCommande";
import BonCommande from "../../../models/bonCommande";
import DetailsDon from "../../../models/detailsDon";

export default async ({params},res, next) => {
    try {

        let liste = await BonCommande.findAll({
            order: [['createdAt', 'DESC']],
            include:[{
                model: DetailsBonCommande
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