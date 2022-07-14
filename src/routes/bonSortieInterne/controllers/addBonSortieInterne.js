import BonProvision from "../../../models/bonProvision";
import DetailsBonProvision from "../../../models/detailsBonProvision";
import BonEntree from "../../../models/bonEntree";
import DetailsBonEntree from "../../../models/detailsBonEntree";
// import _ from "lodash";
 import StockDirection from "../../../models/stockDirection";
import Showroom from "../../../models/showroom";
import BonSortieInterne from "../../../models/bonSortieInterne";
import DetailsBonSortieInterne from "../../../models/detailsBonSortieInterne";
import Lot from "../../../models/lot";

export default async ({ params, body }, res, next) => {
    try {
        const date = new Date()
        const bonSortie = await BonSortieInterne.findOne({where: { id: params.id }})
        if(bonSortie == null){
            return res.sendUserError("Le bon de sortie interne est incorrect")
        }

        const bonProvision = await BonProvision.findOne({where: { id: bonSortie.BonProvisionId }})
        if(bonProvision == null){
            return res.sendUserError("Le bon d'approvisionnement est incorrect")
        }

        if(body.etat === "Réjeté"){
            await bonSortie.update({
                etat: body.etat,
                commentaire: body.commentaire
            });

            await bonProvision.update({
                etat: body.etat
            });
            return res.json({
                success: true,
                bonSortieInterne: bonSortie
            })
        }

        if(body.etat !== "Terminé"){
            return res.sendUserError("Veillez valider le bon d'approvisionnement!")
        }

        if(bonSortie.etat === body.etat){
            return res.sendUserError("Ce bon est deja validé")
        }

        const showroom = await Showroom.findOne({where: { id: bonSortie.ShowroomId}})
        if(showroom == null){
            return res.sendUserError("Aucun Showroom n'est associé a ce bon d'approvisionnement")
        }

        let detailBonProvision = await DetailsBonProvision.findAll({where: {BonProvisionId: bonProvision.id}})
        if(detailBonProvision == null){
            return res.sendUserError("Il n'y a pas de details pour ce bon d'approvisionnement")
        }

        let detailBonSortieInterne = await DetailsBonSortieInterne.findAll({where: {BonSortieInterneId: bonSortie.id}})
        if(detailBonSortieInterne == null || detailBonSortieInterne === []){
            return res.sendUserError("Il n'y a pas de details pour ce bon d'approvisionnement")
        }

        for (let i = 0; i < detailBonSortieInterne.length; i++) {
            const stockDirection = await StockDirection.findOne({
                where: {
                    ArticleId: detailBonSortieInterne[i].ArticleId,
                    DirectionId: bonSortie.DirectionId
                }
            })
            if(body.detailsExit[i].quantite > stockDirection.quantite){
                return res.sendUserError("Impossible stock insuffisant!")
            }

            for (let j = 0; j < body.detailsExit[i].lots.length; j++) {
                const lot = await Lot.findOne({where: { libelle: body.detailsExit[i].lots[j].libelle, ArticleId: detailBonSortieInterne[i].ArticleId}})
                if(lot == null){
                    return res.sendUserError("Lot indisponible!")
                }
            }
        }

        const bonEntree = await BonEntree.create({
            refBE: "BE00" + bonProvision.id + "-" + date.getFullYear(),
            BonProvisionId: bonProvision.id,
            BonSortieInterneId: bonSortie.id,
            ShowroomId: showroom.id,
            DirectionId: showroom.DirectionId,
            totalEcart: 0,
            etat: "En Attente",
            //UserId: bonProvision.UserId
        })


        for (let i = 0; i < detailBonSortieInterne.length; i++) {
            const stockDirection = await StockDirection.findOne({
                where: {
                    ArticleId: detailBonProvision[i].ArticleId,
                    DirectionId: showroom.DirectionId
                }
            })
            if (stockDirection == null) {
                return res.sendUserError("Impossible! Stock de Direction inexistant pour cet article.");
            }
            if(stockDirection.quantite < detailBonProvision[i].quantite){
                return res.sendUserError("Stock principal insuffisant pour cette transaction!")
            }

            let lotQuantity = 0;
            let lot;
            for (let j = 0; j < body.detailsExit[i].lots.length; j++) {
                lot = await Lot.findOne({where: { libelle: body.detailsExit[i].lots[j].libelle, ArticleId: detailBonProvision[i].ArticleId}})
                if(lot == null){
                    return res.sendUserError("Lot indisponible!")
                }
                if(body.detailsExit[i].lots[j].quantite > stockDirection.quantite){
                    body.detailsExit[i].lots[j].quantite = stockDirection.quantite;
                }

                lotQuantity += body.detailsExit[i].lots[j].quantite
            }

            // if(lotQuantity > detailBonProvision[i].quantiteCmd){
            //     lotQuantity = detailBonProvision[i].quantiteCmd;
            // }

            await detailBonSortieInterne[i].update({
                LotId: lot.id,
                quantite: body.detailsExit[i].quantite
            })

            await DetailsBonEntree.create({
                ArticleId: detailBonProvision[i].ArticleId,
                quantiteCmd: detailBonProvision[i].quantite,
                BonEntreeId: bonEntree.id,
                ecart: 0,
                quantiteLivre: 0,
                LotId: lot.id
            });

        }

        await bonProvision.update({
            etat: body.etat
        });



        return res.json({
            success: true,
            bonSortieInterne: bonSortie
        })

    } catch (error) {
        return next(error)
    }
}