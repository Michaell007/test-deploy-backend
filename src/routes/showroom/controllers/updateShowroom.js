import Showroom from "../../../models/showroom";
import _ from "lodash";

export default async ({ body, params }, res, next) => {

    try {
        // check user
        const showroom = await Showroom.findOne({ where: { id: params.id } });
        if (showroom == null) {
            return res.sendUserError("Nom de showroom incorrect.");
        }

        const showroomExist = await Showroom.findOne({ where: { libelle: body.libelle } });
        if ((showroomExist != null) && (showroomExist.libelle !== body.libelle)) {
            return res.sendUserError("Cet nom de showroom existe déjà.");
        }

        // control data body and update
        const payload = _.pick(body, ['libelle', 'description', 'DirectionId', 'phone', 'phoneFixe']);

        await showroom.update(payload);

        // reload data
        let newData = await Showroom.findOne({ where: { id: params.id }});

        return res.json({
            succes: true,
            results: newData
        })

    } catch (error) {
        next(error)
    }
}