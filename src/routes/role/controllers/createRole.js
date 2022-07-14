import Role from "../../../models/roles";
import _ from "lodash";

export default async ({ bodymen: { body }}, res, next) => {
    try {
        body.libelle = _.toUpper(body.libelle);

        const libelleExistDirection = await Role.findOne({where: {libelle: body.libelle, DirectionId: body.DirectionId}});
        if (libelleExistDirection !== null) {
            return res.sendUserError('Role est déjà utilisé dans cette direction.');
        }

        /*const libelleExist = await Role.findOne({where: {libelle: body.libelle} });
        if (libelleExist !== null) {
            return res.sendUserError('Role est déjà utilisé dans ce showroom.');
        }*/




        // enreg. role
        const role = await Role.create(body);



        res.json({
            succes: true,
            results: role
        })

    } catch (error) {
        return next(error)
    }
}