import _ from "lodash";
import Taxe from "../../../models/taxeTVA";

export default async ({ body, params }, res, next) => {

    try {
        // check user
        const taxeTVA = await Taxe.findOne({ where: { id: params.id } });
        if (taxeTVA == null) {
            return res.sendUserError("Nom de taxeTVA incorrect.");
        }


        const taxeTVAExist = await Taxe.findOne({ where: { libelle: body.libelle } });
        if ((taxeTVAExist != null) && (taxeTVA.libelle !== body.libelle)) {

            return res.sendUserError("Cet taxeTVA existe déjà.");
        }

        // control data body and update
        const payload = _.pick(body, ['libelle', 'code', 'taux']);

        await taxeTVA.update(payload);

        // reload data
        let newData = await Taxe.findOne({ where: { id: params.id }});

        return res.json({
            succes: true,
            results: newData
        })

    } catch (error) {
        next(error)
    }
}