import GroupeHabilitation from "../../../models/groupeHabilitation/index.";

export default async ({ params }, res, next) => {
    try {

        let groupeHabilitiation = await GroupeHabilitation.findOne({ where: { id: params.id } });
        if (groupeHabilitiation == null) {
            return res.sendUserError('Identifiant incorrect.');
        }

        // delete model
        await GroupeHabilitation.destroy({ where: { id: params.id } });

        // reload liste
        const liste = await GroupeHabilitation.findAll({});

        return res.json({
            succes: true,
            results: liste
        })

    } catch (error) {
        return next(error)
    }

}