import _ from "lodash";
import Direction from "../../../models/direction";
import StockDirection from "../../../models/stockDirection";
import Pays from "../../../models/pays";
import Article from "../../../models/article";
import CompteBanque from "../../../models/compteBanque";
import CaisseDirection from "../../../models/caisseDirection";

export default async ({ bodymen: { body }}, res, next) => {
    try {
        const libelleExist = await Direction.findOne({ where: { libelle: _.toLower(body.libelle)} });
        if (libelleExist !== null) {
            return res.sendUserError("Ce nom de Direction est déjà utilisé.");
        }

        const directionExist = await Direction.findOne({ where: { PaysId: body.PaysId}})
        if (directionExist !== null){
            return res.sendUserError("Impossible ! Ce pays a déjà une direction.");
        }
        
        let paysExist = await Pays.findOne({ where: { id: body.PaysId}})
        if( paysExist == null){
            return res.sendUserError("Impossible ! Cet pays n'existe pas.");
        }
        const direction = await Direction.create(body);


        let articles = await Article.findAll({attributes: ['id']})

        await Promise.all(articles.map(async (item)=>{
            await StockDirection.create({
                ArticleId: item.id,
                DirectionId: direction.id,
                quantite: 0
            });
        }));

        await CompteBanque.create({
            DirectionId: direction.id,
            libelle: body.libelleCompte,
            numero: body.numeroCompte,
            montant: 0
        });

        await CaisseDirection.create({
            montant: 0,
            DirectionId: direction.id
        });


        return res.json({
            success: true,
            direction: direction
        })
    } catch (error) {
        return next(error)
    }
}