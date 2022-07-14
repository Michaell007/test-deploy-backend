import Pays from "../../../models/pays";
import _ from "lodash";

export default async ({ body, params }, res, next) => {

    try {
        // check user
        const pays = await Pays.findOne({ where: { id: params.id } });
        if (pays == null) {
            return res.sendUserError("Nom de pays incorrect.");
        }

        const paysExist = await Pays.findOne({ where: { libelle: body.libelle } });
        if ((paysExist != null) && (paysExist.libelle !== body.libelle)) {
            return res.sendUserError("Cet nom de Pays existe déjà.");
        }

        // control data body and update
        const payload = _.pick(body, ['libelle', 'description']);

        await pays.update(payload);

        // reload data
        let newData = await Pays.findOne({ where: { id: params.id }})

        return res.json({
            succes: true,
            results: newData
        })

    } catch (error) {
        next(error)
    }
}