import _ from "lodash";
import Direction from "../../../models/direction";

export default async ({ body, params }, res, next) => {

    try {
        // check user
        const direction = await Direction.findOne({ where: { id: params.id } });
        if (direction == null) {
            return res.sendUserError("Nom de Direction incorrect.");
        }

        const directionExist = await Direction.findOne({ where: { libelle: body.libelle } });
        if ((directionExist != null) && (directionExist.libelle !== body.libelle)) {
            return res.sendUserError("Cet nom de Direction existe déjà.");
        }

        // control data body and update
        const payload = _.pick(body, ['libelle', 'description', 'PaysId']);

        await direction.update(payload);

        // reload data
        let newData = await Direction.findOne({ where: { id: params.id }});

        return res.json({
            succes: true,
            results: newData
        })

    } catch (error) {
        next(error)
    }
}