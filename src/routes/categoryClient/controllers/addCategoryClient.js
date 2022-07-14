import CategoryClient from "../../../models/categoryClient";
import _ from "lodash";

export default async ({ bodymen: { body }}, res, next) => {
    try {
        const libelleExist = await CategoryClient.findOne({ where: { libelle: _.toLower(body.libelle)} });
        if (libelleExist !== null) {

            return res.sendUserError("Cet nom de catégorie client est déjà utilisé.");
        }

        // enreg. de la catégorie client
        const categories = await CategoryClient.create(body);

        return res.json({
            success: true,
            categories: categories
        })
    } catch (error) {
        return next(error)
    }
}