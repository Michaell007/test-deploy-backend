import User from "../../../models/user";
import Role from "../../../models/roles";

export default async ({ params }, res, next) => {
    try {

        let liste = await User.findAll({
            order: [['createdAt', 'DESC']],
            include:[{
                model: Role
            }]
        });

        return res.json({
            succes: true,
            details: liste
        })
        
    } catch (error) {
        return next(error)
    }

}