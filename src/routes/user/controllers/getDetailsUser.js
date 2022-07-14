import User from "../../../models/user";
import Role from "../../../models/roles";

export default async ({ params }, res, next) => {
    try {

        let user = await User.findOne({ where: ({ id: params.id }), attributes: {exclude: ['password']},
            include: [{
                model: Role,
                include:[{all: true, nest: true}]
            }]
        });
        if (user == null) {
            return res.sendUserError('Identifiant incorrect.');
        }

        return res.json({
            succes: true,
            user: user
        })
        
    } catch (error) {
        return next(error)
    }

}