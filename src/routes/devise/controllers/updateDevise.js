//import { Sequelize, DataTypes } from "sequelize";
import Devise from "../../../models/devise";
import _ from "lodash";

export default async ({ body, params }, res, next) => {

    try {
        // check user
        const devise = await Devise.findOne({ where: { id: params.id } });
        if (devise == null) {
            return res.sendUserError("Devise incorrect.");
        }


        const deviseExist = await Devise.findOne({ where: { libelle: body.libelle } });
        if ((deviseExist != null) && (devise.libelle !== body.libelle)) {

            return res.sendUserError("Cette devise existe déjà.");
        }

        // control data body and update
        const payload = _.pick(body, ['libelle', 'valeur']);

        await devise.update(payload);

        // reload data
        let newData = await Devise.findOne({ where: { id: params.id }});

        return res.json({
            succes: true,
            results: newData
        })

    } catch (error) {
        next(error)
    }
}