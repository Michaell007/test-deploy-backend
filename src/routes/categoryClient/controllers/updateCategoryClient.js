import CategoryClient from "../../../models/categoryClient";
import _ from "lodash";

export default async ({ body, params }, res, next) => {

    try {
        const categories = await CategoryClient.findOne({ where: { id: params.id } });
        if (categories == null) {
            return res.sendUserError("Categorie client incorrect.");
        }

        const cateoriesExist = await CategoryClient.findOne({ where: { libelle: body.libelle } });
        if ((cateoriesExist != null) && (categories.libelle !== body.libelle)) {
            return res.sendUserError("Cette categorie client existe deja.");
        }

        // control data body and update
        const payload = _.pick(body, ['libelle', 'description']);

        await categories.update(payload);

        // reload data
        let newData = await CategoryClient.findOne({ where: { id: params.id } });

        return res.json({
            succes: true,
            results: newData
        })

    } catch (error) {
        next(error)
    }
}