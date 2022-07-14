import Article from "../../../models/article";
import _ from "lodash";

export default async ({ body, params }, res, next) => {

    try {
        // check user
        const article = await Article.findOne({ where: { id: params.id } });
        if (article == null) {
            return res.sendUserError("Article incorrect.");
        }


        const articleExist = await Article.findOne({ where: { reference: body.reference } });
        if ((articleExist != null) && (article.reference !== body.reference)) {
            return res.sendUserError("Cet article existe déjà.");
        }

        // control data body and update
        const payload = _.pick(body, ['reference', 'designation', 'image', 'CategoryId', 'FournisseurId']);

        await article.update(payload);

        // reload data
        let newData = await Article.findOne({ where: { id: params.id }});

        return res.json({
            succes: true,
            results: newData
        })

    } catch (error) {
        next(error)
    }
}