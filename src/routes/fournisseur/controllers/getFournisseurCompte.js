import CompteFournisseur from "../../../models/compteFournisseur";
import Fournisseur from "../../../models/fournisseur";

export default async ({ params }, res, next) => {
    try {

        let compteFournisseur = await CompteFournisseur.findOne({ where: ({ FournisseurId: params.id }), include: [
                {
                    model: Fournisseur,
                    include:[{all: true, nest: true}]
                }
            ]});
        if (compteFournisseur == null) {
            return res.sendUserError('Nom de Fournisseur incorrect.');
        }

        return res.json({
            succes: true,
            client: compteFournisseur
        })

    } catch (error) {
        return next(error)
    }

}