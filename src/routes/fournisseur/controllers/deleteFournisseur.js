import Fournisseur from "../../../models/fournisseur";

export default async ({ params }, res, next) => {
    try {

        let fournisseur = await Fournisseur.findOne({ where: { id: params.id } });
        if (fournisseur == null) {
            return res.sendUserError("Nom de Fournisseur incorrect.");
        }

        // delete model
        await Fournisseur.destroy({ where: { id: params.id } });

        // reload liste
        const liste = await Fournisseur.findAll({});

        return res.json({
            succes: true,
            results: liste
        })

    } catch (error) {
        return next(error)
    }

}