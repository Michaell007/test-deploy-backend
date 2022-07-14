import _ from "lodash";
import Showroom from "../../../models/showroom";
import Stock from "../../../models/stock";
import Article from "../../../models/article";
import CaisseDirection from "../../../models/caisseDirection";

export default async ({ bodymen: { body }}, res, next) => {
    try {
        const libelleExist = await Showroom.findOne({ where: { libelle: _.toLower(body.libelle)} });
        if (libelleExist !== null) {

            return res.sendUserError("Ce nom de showroom est déjà utilisé.");
        }

        // enreg. de la catégorie article
        const showroom = await Showroom.create(body);

        let articles = await Article.findAll({attributes: ['id']})

            await Promise.all(articles.map(async (item)=>{
                await Stock.create({
                    ArticleId: item.id,
                    ShowroomId: showroom.id,
                    quantite: 0
                });
            }))

        await CaisseDirection.create({
            montant: 0,
            ShowroomId: showroom.id
        })
        return res.json({
            success: true,
            showroom: showroom
        })
    } catch (error) {
        return next(error)
    }
}