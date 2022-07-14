import BonCommande from "../../../models/bonCommande";
//import DetailsBonCommande from "../../../models/detailsBonCommande";
// import Fournisseur from "../../../models/fournisseur";

export default async ({ body, params }, res, next) => {
    try {
        const bonCommandeEnCours = await BonCommande.findOne({where: {id: params.id}})
        if (bonCommandeEnCours == null){
            return res.sendUserError("Bon commande incorrect");
        }

        /*if (body.FournisseurId == null || body.FournisseurId === ""){
            var fournisseur = await Fournisseur.create({
                libelle: body.libelleFournisseur,
                phone: body.phoneFournisseur,
                adresse: body.adresseFournisseur,
                email: body.emailFournisseur,
                pays: body.paysFournisseur,
                personne: body.personne
            })
        }*/


        //if (bonCommandeEnCours.etat !== "En cours") {
          //  return res.sendUserError("Bon de commande Incorrect");
        //}
           /* let detailCommandeEnCours = await DetailsBonCommande.findAll({ where: { BonCommandeId: bonCommandeEnCours.id}});

            if(detailCommandeEnCours == null){
                return res.sendUserError("Aucun detail pour ce bon de commande");
            }

            for (let i = 0; i < detailCommandeEnCours.length; i++) {
                await detailCommandeEnCours[i].update({
                    prix: parseInt(body.detailsEntries[i].prix),
                    montant: parseInt(body.detailsEntries[i].prix) * detailCommandeEnCours[i].quantite
                })
                await bonCommandeEnCours.update({
                    montantTotal: bonCommandeEnCours.montantTotal + (detailCommandeEnCours[i].quantite * parseInt(body.detailsEntries[i].prix))
                });
            }*/

       /* if (body.FournisseurId == null || body.FournisseurId === ""){
            await bonCommandeEnCours.update({
                etat: body.etat,
                FournisseurId: fournisseur.id
            })

            return res.json({
                success: true,
                bonCommande: bonCommandeEnCours
            })
        }*/

        await bonCommandeEnCours.update({
            etat: body.etat
        })

        return res.json({
            success: true,
            bonCommande: bonCommandeEnCours
        })


    } catch (error) {
        return next(error)
    }
}