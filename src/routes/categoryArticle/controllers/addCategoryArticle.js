import CategoryArticle from "../../../models/categoryArticle";
import _ from "lodash";

export default async ({ bodymen: { body }}, res, next) => {
    try {
        const titreExist = await CategoryArticle.findOne({ where: { titre: _.toLower(body.titre)} });
        if (titreExist !== null) {

            return res.sendUserError("Cet nom de catégorie d'article est déjà utilisé.");
        }

        // enreg. de la catégorie article
        const categories = await CategoryArticle.create(body);

        return res.json({
            success: true,
            categories: categories
        })
    } catch (error) {
        return next(error)
    }
}