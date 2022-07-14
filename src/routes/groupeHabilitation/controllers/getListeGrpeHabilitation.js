import GroupeHabilitation from "../../../models/groupeHabilitation/index.";

export default async ({ params }, res, next) => {
    try {
        // get liste
        let liste = await GroupeHabilitation.findAll({
            order: [['createdAt', 'DESC']],
            /*include: [{
                model: User
            }]*/ });

        return res.json({
            succes: true,
            results: liste
        })

    } catch (error) {
        return next(error)
    }

}