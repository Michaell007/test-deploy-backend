import BonSortieInterne from "../../../models/bonSortieInterne";
import Showroom from "../../../models/showroom";
import Article from "../../../models/article";
import Stock from "../../../models/stock";
import DetailsBonSortieInterne from "../../../models/detailsBonSortieInterne";

export default async ({ body, params }, res, next) => {

    try {
        // check
        const bonSortieInterne = await BonSortieInterne.findOne({ where: { id: params.id } });
        if (bonSortieInterne == null) {
            return res.sendUserError("Bon Sortie Interne incorrect.");
        }

        if(bonSortieInterne.etat === "Terminé"){
            return res.sendUserError("Impossible bon déjà terminé.");
        }

        const showroom = await Showroom.findOne({where: {id: parseInt(body.ShowroomId)}});
        if (showroom == null){
            return res.sendUserError("Ce showroom n'existe pas");
        }

        await bonSortieInterne.update({
            ShowroomId: showroom.id,
        })

        for (let i = 0; i < body.detailsExit.length; i++) {
            const article = await Article.findOne({where: {id: parseInt(body.detailsExit[i].ArticleId)}})
            if (article == null){
                return res.sendUserError("Cet article n'existe pas")
            }

            const stock = await Stock.findOne({
                where: {
                    ArticleId: article.id,
                    ShowroomId: showroom.id
                }
            })

            if (stock == null || stock === []){
                return res.sendUserError("Impossible! Stock inexistant pour cet article.");
            }

            let detailDestroy  = await DetailsBonSortieInterne.findOne({where: { ArticleId: article.id, BonSortieInterneId: bonBonSortieInterneInterne.id}})
            if (detailDestroy == null){
                return res.sendUserError("Il n'y a pas de details pour cette entrée !")
            }

            await detailDestroy.destroy();

            let detailsGet = [];
            detailsGet[i] = await DetailsBonSortieInterne.create({
                ArticleId: article.id,
                BonSortieInterneId: bonSortieInterne.id,
                quantite: parseInt(body.detailsExit[i].quantite),
                prix: article.prix,
                montant: parseInt(body.detailsExit[i].quantite) * article.prix
            })
        }


        // reload data
        let newData = await BonSortieInterne.findOne({ where: { id: bonSortieInterne.id }});

        return res.json({
            succes: true,
            results: newData
        })

    } catch (error) {
        next(error)
    }
}