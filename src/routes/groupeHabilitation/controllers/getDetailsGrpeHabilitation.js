//import User from "../../../models/user";
import GroupeHabilitation from "../../../models/groupeHabilitation/index.";

export default async ({ params }, res, next) => {
    try {

        // check role
        let groupeHabilitaion = await GroupeHabilitation.findOne({ where: ({ id: params.id })/*, include: [{
                model: User,
                include:[{all: true, nest: true}]

            }] */});
        if (groupeHabilitaion == null) {
            return res.sendUserError('Identifiant incorrect.');
        }

        return res.json({
            succes: true,
            results: groupeHabilitaion
        })

    } catch (error) {
        return next(error)
    }

}