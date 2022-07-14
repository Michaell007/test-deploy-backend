import DetailsBonCommande from "../../../models/detailsBonCommande";

export default async ({ params }, res, next) => {
    try {

        let detailsBonCommande = await DetailsBonCommande.findOne({ where: { id: params.id } });
        if (detailsBonCommande == null) {
            return res.sendUserError("Nom incorrect pour les details de l'entrée.");
        }

        // delete model
        await DetailsBonCommande.destroy({ where: { id: params.id } });

        // reload liste
        const liste = await DetailsBonCommande.findAll({});

        return res.json({
            succes: true,
            results: liste
        })

    } catch (error) {
        return next(error)
    }

}