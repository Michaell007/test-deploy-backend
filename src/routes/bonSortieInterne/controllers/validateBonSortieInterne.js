import BonProvision from "../../../models/bonProvision";
import BonSortieInterne from "../../../models/bonSortieInterne";
import DetailsBonSortieInterne from "../../../models/detailsBonSortieInterne";
import StockDirection from "../../../models/stockDirection";
import Showroom from "../../../models/showroom";

export default async ({ params, body }, res, next) => {
    try {
        const bonSortieInterne = await BonSortieInterne.findOne({where: { id: params.id }})
        if(bonSortieInterne == null){
            return res.sendUserError("Le bon d'entrée est incorrect")
        }

        if(body.etat !== "Terminé"){
            return res.sendUserError("Veillez valider le bon de sortie interne!")
        }

        const showroom = await Showroom.findOne({where: { id: bonProvision.ShowroomId}})
        if(showroom == null){
            return res.sendUserError("Aucun Showroom n'est associé a ce bon d'approvisionnement")
        }

        if(bonSortieInterne.etat === body.etat){
            return res.sendUserError("Ce bon est deja validé")
        }

        const bonProvision = await BonProvision.findOne({where: { id: bonSortieInterne.BonProvisionId}})
        if(bonProvision == null){
            return res.sendUserError("Aucun bon d'approvisionnement n'est associé a ce ID")
        }

        let detailBonSortieInterne = await DetailsBonSortieInterne.findAll({where: {BonSortieInterneId: bonSortieInterne.id}})
        if(detailBonSortieInterne == null || detailBonSortieInterne === []){
            return res.sendUserError("Il n'y a pas de details pour ce bon d'approvisionnement")
        }

        for (let i = 0; i < detailBonSortieInterne.length; i++) {
            const stockDirection = await StockDirection.findOne({
                where: {
                    ArticleId: detailBonSortieInterne[i].ArticleId,
                    DirectionId: showroom.DirectionId
                }
            })

            await detailBonSortieInterne[i].update({
                lot: body.detailsExit[i].lot
            })

            await stockDirection.update ({
                quantite: stockDirection.quantite - detailBonSortieInterne[i].quantite
            });
        }

        await bonSortieInterne.update({
            etat: body.etat
        });


        return res.json({
            success: true,
            bonSortieInterne: bonSortieInterne
        })


    } catch (error) {
        return next(error)
    }
}
