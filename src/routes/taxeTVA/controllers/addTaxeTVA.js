import _ from "lodash";
import Taxe from "../../../models/taxeTVA";

export default async ({ bodymen: { body }}, res, next) => {
    try {
        const codeExist = await Taxe.findOne({ where: { libelle: _.toLower(body.libelle)} });
        if (codeExist !== null) {

            return res.sendUserError("Ce nom de tauxTVA est déjà utilisé.");
        }

        const taxeTVA = await Taxe.create(body);

        return res.json({
            success: true,
            taxeTVA: taxeTVA
        })

    } catch (error) {
        return next(error)
    }
}