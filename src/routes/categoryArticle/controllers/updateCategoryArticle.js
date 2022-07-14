import CategoryArticle from "../../../models/categoryArticle";
import _ from "lodash";

export default async ({ body, params }, res, next) => {

    try {
        // check user
        const categories = await CategoryArticle.findOne({ where: { id: params.id } });
        if (categories == null) {
            return res.sendUserError("Categorie d'article incorrect.");
        }


        const cateoriesExist = await CategoryArticle.findOne({ where: { titre: body.titre } });
        if ((cateoriesExist != null) && (categories.titre !== body.titre)) {

            return res.sendUserError("Cette categorie d'article existe deja.");
        }

        // control data body and update
        const payload = _.pick(body, ['titre', 'designation']);

        await categories.update(payload);

        // reload data
        let newData = await CategoryArticle.findOne({ where: { id: params.id }/*, attributes: {exclude: ['password']}*/ });

        return res.json({
            succes: true,
            results: newData
        })

    } catch (error) {
        next(error)
    }
}