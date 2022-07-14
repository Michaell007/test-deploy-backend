import BonCommande from "../../../models/bonCommande";
import DetailsBonCommande from "../../../models/detailsBonCommande";
import Article from "../../../models/article";
export default async ({ params, body }, res, next) => {
    try {

        const bonCommande = await BonCommande.findOne({where: { id: params.id }})
        if(bonCommande == null){
            return res.sendUserError("Le bon de commande est incorrect")
        }

        if(body.etat === "Réjeté"){
            await bonCommande.update({
                etat: body.etat,
                validateByDG: false
            });

            return res.json({
                success: true,
                bonCommande: bonCommande
            })
        }

        if(bonCommande.validateByDG === true){
            return res.sendUserError("Ce bon est deja validé")
        }

        let detailCommandeDG = await DetailsBonCommande.findAll({ where: { BonCommandeId: bonCommande.id}});
        if(detailCommandeDG == null){
            return res.sendUserError("Aucun detail pour ce bon de commande");
        }

        await bonCommande.update({
            montantTotal: 0
        });

        for (let i = 0; i < body.detailsEntries.length; i++) {
            const article = await Article.findOne({where: {id: parseInt(body.detailsEntries[i].ArticleId)}});
            if (article == null){
                return res.sendUserError("Cet article n'existe pas")
            }

            await detailCommandeDG[i].update({
                ArticleId: article.id,
                BonCommandeId: bonCommande.id,
                quantite: parseInt(body.detailsEntries[i].quantite),
                prix: parseInt(body.detailsEntries[i].prix),
                montant: parseInt(body.detailsEntries[i].quantite) * parseInt(body.detailsEntries[i].prix)
            });

            await bonCommande.update({
                montantTotal: bonCommande.montantTotal + detailCommandeDG[i].montant
            });
        }

        await bonCommande.update({
            etat: body.etat,
            validateByDG: true
        });


        return res.json({
            success: true,
            bonCommande: bonCommande
        })


    } catch (error) {
        return next(error)
    }
}