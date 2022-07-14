import Role from "../../../models/roles";
import _ from "lodash";

export default async ({ body, params }, res, next) => {
    try {

        // check role
        const role = await Role.findOne({ where: { id: params.id } });
        if (role == null) {
            return res.sendUserError('Role incorrect.');
        }

        // get and load all libelle
        const libelleAll = await Role.findAll({ attributes: ['libelle'] });
        const objlist = [];
        _.forEach(libelleAll, function(entity) {
            if (entity.libelle != role.libelle) {
                objlist.push(entity.libelle);
            }
        });

        // check if libelle exist
        if (_.indexOf(objlist, body.libelle) != -1) return res.sendUserError('Ce libelle est deja utilise.');
        
        // control data body and update
        const payload = _.pick(body, ['libelle', 'description', 'ShowroomId', 'DirectionId']);
        await role.update(payload);

        return res.json({
            succes: true,
            results: role
        })

    } catch (error) {
        next(error)
    }
}