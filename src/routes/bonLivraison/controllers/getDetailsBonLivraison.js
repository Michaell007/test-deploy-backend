import BonLivraison from "../../../models/bonLivraison";
import DetailsBonLivraison from "../../../models/detailsBonLivraison";
import Client from "../../../models/client";
import Facture from "../../../models/facture";

export default async ({ params }, res, next) => {
    try {

        let bonLivraison = await BonLivraison.findOne({ where: ({id: params.id}) ,include: [{
                model: DetailsBonLivraison,
                include:[{all: true, nest: true}]
            },{
                model: Client
            },{
                model: Facture
            }]});
        if (bonLivraison == null) {
            return res.sendUserError('Bon Livraison incorrect.');
        }

        return res.json({
            succes: true,
            bonLivraison: bonLivraison
        })

    } catch (error) {
        return next(error)
    }

}