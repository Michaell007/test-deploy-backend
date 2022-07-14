import Article from "../../../models/article";
import _ from "lodash";
import Stock from "../../../models/stock";
import Showroom from "../../../models/showroom";
import Direction from "../../../models/direction";
import StockDirection from "../../../models/stockDirection";
import CategoryArticle from "../../../models/categoryArticle";
import PrixClient from "../../../models/prix";

export default async ({ bodymen: { body }}, res, next) => {
    try {
        /*const refernceExist = await Article.findOne({ where: { reference: body.reference} });
        if (refernceExist !== null) {
            return res.sendUserError("Cette reference d'article est déjà utilisé.");
        }*/

        const designationExist = await Article.findOne({ where: { designation: _.toLower(body.designation)} });
        if (designationExist !== null) {
            return res.sendUserError("Ce nom d'article est déjà utilisé.");
        }

        // enreg. de la catégorie article
        let category = await CategoryArticle.findAll();

        if (category === [] || category == null){
            return res.sendUserError("Veillez créer une categorie d'article avant l'enregistrement de l'article.");
        }

        const article = await Article.create(body);

        for (let i = 0; i < body.prix.length; i++) {
            await PrixClient.create({
                intitule: body.prix[i],
                ArticleId: article.id,
                CategoryClientId: body.CategoryClient[i]
            })
        }

        let showrooms = await Showroom.findAll({attributes: ['id']})
        let directions = await Direction.findAll({attributes: ['id']})


        await Promise.all(showrooms.map(async (item)=>{
            await Stock.create({
                ArticleId: article.id,
                ShowroomId: item.id,
                quantite: 0
            });
        }))

        await Promise.all(directions.map(async (item)=>{
            await StockDirection.create({
                ArticleId: article.id,
                DirectionId: item.id,
                quantite: 0
            });
        }))

        return res.json({
            success: true,
            article: article
        })


    } catch (error) {
        return next(error)
    }
}