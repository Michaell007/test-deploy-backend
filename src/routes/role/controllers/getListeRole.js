import Role from "../../../models/roles";
import User from "../../../models/user";

export default async ({ params }, res, next) => {
    try {
        // get liste
        let liste = await Role.findAll({
            order: [['createdAt', 'DESC']],
            include: [{
                model: User
            }] });

        return res.json({
            succes: true,
            results: liste
        })
        
    } catch (error) {
        return next(error)
    }

}