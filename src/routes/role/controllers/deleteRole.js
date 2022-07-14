import Role from "../../../models/roles";

export default async ({ params }, res, next) => {
    try {

        let role = await Role.findOne({ where: { id: params.id } });
        if (role == null) {
            return res.sendUserError('Identifiant incorrect.');
        }

        // delete model
        await Role.destroy({ where: { id: params.id } });

        // reload liste
        const liste = await Role.findAll({});

        return res.json({
            succes: true,
            results: liste
        })
        
    } catch (error) {
        return next(error)
    }

}