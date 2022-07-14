import Devise from "../../../models/devise";
// import _ from "lodash";

export default async ({ bodymen: { body }}, res, next) => {
    try {
        const libelleExist = await Devise.findOne({ where: { libelle: body.libelle} });
        if (libelleExist !== null) {
            return res.sendUserError("Cette reference devise est déjà utilisé.");
        }
        const devise = await Devise.create(body);

        return res.json({
            success: true,
            devise: devise
        })


    } catch (error) {
        return next(error)
    }
}