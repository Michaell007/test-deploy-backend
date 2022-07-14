import BonCommande from "../../../models/bonCommande";
import DetailsBonCommande from "../../../models/detailsBonCommande";
import DetailsDon from "../../../models/detailsDon";

export default async ({ params }, res, next) => {
    try {

        let bonCommande = await BonCommande.findOne({ where: ({id: params.id}) ,include: [{
                model: DetailsBonCommande,
                include:[{all: true, nest: true}]
            }]});
        if (bonCommande == null) {
            return res.sendUserError('Entrée incorrect.');
        }

        return res.json({
            succes: true,
            bonCommande: bonCommande
        })

    } catch (error) {
        return next(error)
    }

}