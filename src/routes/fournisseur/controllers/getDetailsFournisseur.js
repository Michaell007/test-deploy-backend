import Fournisseur from "../../../models/fournisseur";
import BonReception from "../../../models/bonReception";
import Article from "../../../models/article";

export default async ({ params }, res, next) => {
    try {

        let fournisseur = await Fournisseur.findOne({ where: ({ id: params.id }), include: [
            {
                model: BonReception,
                include:[{all: true, nest: true}]
            },
            {
                model: Article,
                include:[{all: true, nest: true}]
            }

            ]});
        if (fournisseur == null) {
            return res.sendUserError('Nom de fournisseur incorrect.');
        }

        return res.json({
            succes: true,
            fournisseur: fournisseur
        })

    } catch (error) {
        return next(error)
    }

}