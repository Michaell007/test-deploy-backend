import Fournisseur from "../../../models/fournisseur";
import BonReception from "../../../models/bonReception";
import Article from "../../../models/article";

export default async ({params},res, next) => {
    try {

        let liste = await Fournisseur.findAll({
            include:[{
                model: BonReception
            },{
                model: Article
            }]
        });

        return res.json({
            succes: true,
            details: liste
        })

    } catch (error) {
        return next(error)
    }

}