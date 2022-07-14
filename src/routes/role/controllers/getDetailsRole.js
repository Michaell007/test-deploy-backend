import Role from "../../../models/roles";
import User from "../../../models/user";

export default async ({ params }, res, next) => {
    try {

        // check role
        let role = await Role.findOne({ where: ({ id: params.id }), include: [{
                model: User,
                include:[{all: true, nest: true}]

            }] });
        if (role == null) {
            return res.sendUserError('Identifiant incorrect.');
        }

        return res.json({
            succes: true,
            results: role
        })
        
    } catch (error) {
        return next(error)
    }

}