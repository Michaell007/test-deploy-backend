//import { Sequelize, DataTypes } from "sequelize";
import Lot from "../../../models/lot";
import _ from "lodash";

export default async ({ body, params }, res, next) => {

    try {
        // check user
        const lot = await Lot.findOne({ where: { id: params.id } });
        if (lot == null) {
            return res.sendUserError("Lot incorrect.");
        }


        const lotExist = await Lot.findOne({ where: { libelle: body.libelle } });
        if ((lotExist != null) && (lot.libelle !== body.libelle)) {

            return res.sendUserError("Ce lot existe déjà.");
        }

        // control data body and update
        const payload = _.pick(body, ['libelle', 'datePeremption']);

        await lot.update(payload);

        // reload data
        let newData = await Lot.findOne({ where: { id: params.id }});

        return res.json({
            succes: true,
            results: newData
        })

    } catch (error) {
        next(error)
    }
}