import BonSortieInterne from "../../../models/bonSortieInterne";

export default async ({ params }, res, next) => {
    try {

        let bonSortieInterne = await BonSortieInterne.findOne({ where: { id: params.id } });
        if (bonSortieInterne == null) {
            return res.sendUserError("Bon Sortie Interne incorrect.");
        }

        // delete model
        await BonSortieInterne.destroy({ where: { id: params.id } });

        // reload liste
        const liste = await BonSortieInterne.findAll({});

        return res.json({
            succes: true,
            results: liste
        })

    } catch (error) {
        return next(error)
    }

}