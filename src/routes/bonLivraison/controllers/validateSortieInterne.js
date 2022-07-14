import BonLivraison from "../../../models/bonLivraison";
import DetailsBonLivraison from "../../../models/detailsBonLivraison";
import StockDirection from "../../../models/stockDirection";

export default async ({ params, body }, res, next) => {
    try {

        const bonLivraison = await BonLivraison.findOne({where: { id: params.id }})
        if(bonLivraison == null){
            return res.sendUserError("Le bon de Livraison est incorrect")
        }

        if(body.etat === "Réjeté"){
            if (body.commentaire == null || body.commentaire === ""){
                return res.sendUserError("Veillez sasir le motif de votre refus")
            }

            await bonLivraison.update({
                commentaire: body.commentaire
            });

            return res.json({
                success: true,
                bonLivraison: bonLivraison
            })
        }

        if(body.etat !== "Terminé"){
            return res.sendUserError("Veillez valider ou refuser la bonLivraison")
        }

        await bonLivraison.update({
            etat: body.etat,
            commentaire: body.commentaire,
            expedition: body.expedition,
            dateLivraison: body.dateLivraison,
        });

        let detailsLivraisons = await DetailsBonLivraison.findAll({where: { BonLivraisonId: bonLivraison.id}})
        if(detailsLivraisons == null){
            return res.sendUserError("Aucun Details livraison associée")
        }

        for (let i = 0; i < detailsLivraisons.length; i++) {
            const stockDirection = await StockDirection.findOne({
                where: {
                    ArticleId: detailsLivraisons[i].ArticleId,
                    DirectionId: bonLivraison.DirectionId
                }
            })
            if (stockDirection == null) {
                return res.sendUserError("Impossible! Stock de Direction inexistant pour cet article.");
            }
            if(stockDirection.quantite < parseInt(body.detailsExit[i].quantite)){
                return res.sendUserError("Stock principal insuffisant pour cette transaction!")
            }
            await detailsLivraisons[i].update({
                quantite: parseInt(body.detailsExit[i].quantite),
                montant: 0
            });
            await bonLivraison.update({
                quantiteTotal: bonLivraison.quantiteTotal + detailsLivraisons[i].quantite
            });

            await detailsLivraisons[i].update({
                lot: body.detailsExit[i].lot
            })

            await stockDirection.update ({
                quantite: stockDirection.quantite - detailsLivraisons[i].quantite
            });
        }

        return res.json({
            success: true,
            bonLivraison: bonLivraison
        })


    } catch (error) {
        return next(error)
    }
}