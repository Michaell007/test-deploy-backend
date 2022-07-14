import Article from "../../../models/article";
import BonCommande from "../../../models/bonCommande";
import DetailsBonCommande from "../../../models/detailsBonCommande";
import Direction from "../../../models/direction";
import Fournisseur from "../../../models/fournisseur";

export default async ({ bodymen: { body }}, res, next) => {
    try {

        const direction = await Direction.findOne({ where: { id: parseInt(body.DirectionId)} }) ;
        if (direction == null){
            return res.sendUserError("Cette direction n'existe pas");
        }

        if (body.etat !== "En cours"){
            return res.sendUserError("Bon de commande en edition")
        }

        const fournisseur = await Fournisseur.findOne({where:{ id: parseInt(body.FournisseurId)}});
        if(fournisseur == null){
            return res.sendUserError("Cet Fournisseur n'existe pas");
        }

        const bonCommande = await BonCommande.create({
            DirectionId: direction.id,
            etat: body.etat,
            montantTotal: 0,
            FournisseurId: fournisseur.id ,
            //UserId:
        });

        //Création de detail Entrée
        for (let i = 0; i < body.detailsEntries.length; i++) {
            const article = await Article.findOne({where: {id: parseInt(body.detailsEntries[i].ArticleId)}});
            if (article == null){
                return res.sendUserError("Cet article n'existe pas")
            }

            let detailsElementDirection = [];
            detailsElementDirection[i] = await DetailsBonCommande.create({
                ArticleId: article.id,
                BonCommandeId: bonCommande.id,
                quantite: parseInt(body.detailsEntries[i].quantite),
                prix: parseInt(body.detailsEntries[i].prix),
                montant: parseInt(body.detailsEntries[i].quantite) * parseInt(body.detailsEntries[i].prix)
            });

            await bonCommande.update({
                montantTotal: bonCommande.montantTotal + detailsElementDirection[i].montant
            });
        }

        const date = new Date()
        await bonCommande.update({
            refBDC: "BDC00" + bonCommande.id + "-" + date.getFullYear(),
        });

        return res.json({
            success: true,
            bonCommande: bonCommande
        });


    } catch (error) {
        return next(error)
    }
}