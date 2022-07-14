import _ from "lodash";
import Pays from "../../../models/pays";

export default async ({ bodymen: { body }}, res, next) => {
    try {
        const libelleExist = await Pays.findOne({ where: { libelle: _.toLower(body.libelle)} });
        if (libelleExist !== null) {

            return res.sendUserError("Ce nom de Pays est déjà utilisé.");
        }

        // enreg. de la catégorie article
        const pays = await Pays.create(body);

        return res.json({
            success: true,
            pays: pays
        })
    } catch (error) {
        return next(error)
    }
}