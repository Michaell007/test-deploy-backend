import Article from "../../../models/article";
import DetailsBonCommande from "../../../models/detailsBonCommande";
import BonCommande from "../../../models/bonCommande";

export default async ({params},res, next) => {
    try {

        let liste = await DetailsBonCommande.findAll({
            order: [['createdAt', 'DESC']]
            ,include: [{
                model: BonCommande
            },
                {
                    model: Article
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