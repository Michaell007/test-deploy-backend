import BonCommande from "../../../models/bonCommande";

export default async ({ params }, res, next) => {
    try {

        let bonCommandes = await BonCommande.findAll()
        if (bonCommandes == null) {
            return res.sendUserError('bon commande incorrect.');
        }

        for (let i = 0; i < bonCommandes.length; i++) {
            if(bonCommandes[i].accompte < bonCommandes[i].montantTotal){
               var impaye = []
                   impaye[i] = bonCommandes[i];
            }
        }

        return res.json({
            succes: true,
            bonCommande: impaye
        })

    } catch (error) {
        return next(error)
    }

}