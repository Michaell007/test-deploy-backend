import Article from "../../../models/article";
import BonProvision from "../../../models/bonProvision";
import DetailsBonProvision from "../../../models/detailsBonProvision";
import Showroom from "../../../models/showroom";
import BonSortieInterne from "../../../models/bonSortieInterne";
import DetailsBonSortieInterne from "../../../models/detailsBonSortieInterne";
import Lot from "../../../models/lot";

export default async ({ bodymen: { body }}, res, next) => {
    try {
        // recupperer le showroomId des données recu.
        const showroom = await Showroom.findOne({ where: { id: parseInt(body.ShowroomId)} }) ;
        if (showroom == null){
            return res.sendUserError("Ce showroom n'existe pas");
        }

        const date = new Date()

         if(body.etat === "Edition"){
            const bonProvisionEdition = await BonProvision.create({
                ShowroomId: showroom.id,
                etat: body.etat
            })
            for (let i = 0; i < body.detailsEntries.length; i++) {
                const article = await Article.findOne({where: {id: parseInt(body.detailsEntries[i].ArticleId)}});
                if (article == null){
                    return res.sendUserError("Cet article n'existe pas")
                }

                let detailsElementShowroom = [];
                detailsElementShowroom[i] = await DetailsBonProvision.create({
                    ArticleId: article.id,
                    BonProvisionId: bonProvisionEdition.id,
                    quantite: parseInt(body.detailsEntries[i].quantite)
                })
            }
            return res.json({
                success: true,
                bonProvision: bonProvisionEdition
            })
        }

        if (body.etat !== "En cours"){
            return res.sendUserError("Bon d'approvisionnement' en edition")
        }

        const bonProvision = await BonProvision.create({
            ShowroomId: showroom.id,
            etat: body.etat
        })

        const bonSortieInterne = await BonSortieInterne.create({
            refBSI: "BSI00" + bonProvision.id + "-" + date.getFullYear(),
            BonProvisionId: bonProvision.id,
            ShowroomId: showroom.id,
            DirectionId: showroom.DirectionId,
            etat: "En Attente",
            //UserId: bonProvision.UserId
        })

        //Création de detail Bon d'approvisionnement
        for (let i = 0; i < body.detailsEntries.length; i++) {
            const article = await Article.findOne({where: {id: parseInt(body.detailsEntries[i].ArticleId)}});
            if (article == null){
                return res.sendUserError("Cet article n'existe pas")
            }

            let detailSortie = []
            detailSortie[i] = await DetailsBonSortieInterne.create({
                ArticleId: article.id,
                quantite: parseInt(body.detailsEntries[i].quantite),
                BonSortieInterneId: bonSortieInterne.id
            });

            let detailsElementShowroom = [];
            detailsElementShowroom[i] = await DetailsBonProvision.create({
                ArticleId: article.id,
                BonProvisionId: bonProvision.id,
                quantite: parseInt(body.detailsEntries[i].quantite)
            })

        }

        await bonProvision.update({
            refBA: "BA00" + bonProvision.id + "-" + date.getFullYear(),
        });

        /*await bonSortieInterne.update({
            refBSI: "BSI00" + bonProvision.id + "-" + date.getFullYear(),
        });*/

        return res.json({
            success: true,
            bonProvision: bonProvision
        })


    } catch (error) {
        return next(error)
    }
}