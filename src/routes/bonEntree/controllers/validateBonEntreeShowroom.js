import BonProvision from "../../../models/bonProvision";
import BonEntree from "../../../models/bonEntree";
import DetailsBonEntree from "../../../models/detailsBonEntree";
import Stock from "../../../models/stock";
import Showroom from "../../../models/showroom";
import DetailsBonSortieInterne from "../../../models/detailsBonSortieInterne";
import BonSortieInterne from "../../../models/bonSortieInterne";
import StockDirection from "../../../models/stockDirection";
// import BonLivraison from "../../../models/bonLivraison";

export default async ({ params, body }, res, next) => {
    try {

        const bonEntree = await BonEntree.findOne({where: { id: params.id }})
        if(bonEntree == null){
            return res.sendUserError("Le bon d'entrée est incorrect")
        }

        /*const bonLivraison = await BonLivraison.findOne({where: {BonSortieInterneId: bonEntree.BonSortieInterneId}})
        if(bonLivraison == null){
            return res.sendUserError("Aucun bon livraison n'est associé a ce bon d'entrée")
        }*/

        if(body.etat !== "Terminé"){
            return res.sendUserError("Veillez valider le bon d'entrée!")
        }
        if(bonEntree.etat === body.etat){
            return res.sendUserError("Ce bon est deja validé")
        }

        const bonSortieInterne = await BonSortieInterne.findOne({where: { id: bonEntree.BonSortieInterneId}})
        if(bonSortieInterne == null){
            return res.sendUserError("Aucun bon d'entrée n'est associé a ce bon d'entrée")
        }

        const bonProvision = await BonProvision.findOne({where: { id: bonSortieInterne.BonProvisionId}})
        if(bonProvision == null){
            return res.sendUserError("Aucun bon d'entrée n'est associé a ce ID")
        }



        const showroom = await Showroom.findOne({where: { id: bonEntree.ShowroomId}})
        if(showroom == null){
            return res.sendUserError("Aucun Showroom n'est associé a ce bon d'entrée")
        }

        let detailBonEntree = await DetailsBonEntree.findAll({where: {BonEntreeId: bonEntree.id}})
        if(detailBonEntree == null || detailBonEntree === []){
            return res.sendUserError("Il n'y a pas de details pour ce bon d'entrée")
        }

        let detailBonSortie = await DetailsBonSortieInterne.findAll({where: {BonSortieInterneId: bonEntree.BonSortieInterneId}})
        if(detailBonSortie == null || detailBonSortie === []){
            return res.sendUserError("Il n'y a pas de details pour ce bon d'entrée")
        }

        for (let i = 0; i < detailBonEntree.length; i++) {
            const stock = await Stock.findOne({
                where: {
                    ArticleId: detailBonEntree[i].ArticleId,
                   ShowroomId: bonEntree.ShowroomId
                }
            })
            if (stock == null){
                return res.sendUserError("Impossible! Stock inexistant pour cet article.");
            }

            const stockDirection = await StockDirection.findOne({
                where: {
                    ArticleId: detailBonEntree[i].ArticleId,
                    DirectionId: bonSortieInterne.DirectionId
                }
            })
            if (stockDirection == null) {
                return res.sendUserError("Impossible! Stock de Direction inexistant pour cet article.");
            }


            await detailBonEntree[i].update({
                quantiteLivre: body.detailsEntries[i].quantite,
                // lot: detailBonSortie[i].lot,
                ecart: detailBonEntree[i].quantiteCmd - body.detailsEntries[i].quantite,
            })

            await bonEntree.update({
                totalEcart: bonEntree.totalEcart + detailBonEntree[i].ecart
            });

            await stockDirection.update ({
                quantite: stockDirection.quantite - detailBonEntree[i].quantiteLivre
            });

            await stock.update ({
                quantite: stock.quantite + detailBonEntree[i].quantiteLivre
            });
        }

        await bonEntree.update({
            etat: body.etat
        });

        await bonSortieInterne.update({
            etat: body.etat
        });


        return res.json({
            success: true,
            bonEntree: bonEntree
        })


    } catch (error) {
        return next(error)
    }
}