import BonCommande from "../../../models/bonCommande";
import Article from "../../../models/article";
import DetailsBonCommande from "../../../models/detailsBonCommande";

export default async ({ params }, res, next) => {
    try {

        let detailsBonCommande = await DetailsBonCommande.findOne({
            where:
                ({id: params.id}),
            include: [{
                model: BonCommande,
                include: [{all: true, nest: true}]
            },
                {
                    model: Article,
                    include: [{all: true, nest: true}]
                }]
        });
        if (detailsBonCommande == null) {
            return res.sendUserError("Nom des details pour l'bonCommande incorrect.");
        }

        return res.json({
            succes: true,
            detailsBonCommande: detailsBonCommande
        })

    } catch (error) {
        return next(error)
    }

}