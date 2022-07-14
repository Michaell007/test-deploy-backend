import User from "../../../models/user";

export default async ({ params }, res, next) => {
    try {

        let user = await User.findOne({ where: { id: params.id } });
        if (user == null) {
            return res.sendUserError('Identifiant incorrect.');
        }

        // delete model
        await User.destroy({ where: { id: params.id } });

        // reload liste
        const liste = await User.findAll({});

        return res.json({
            succes: true,
            results: liste
        })
        
    } catch (error) {
        return next(error)
    }

}