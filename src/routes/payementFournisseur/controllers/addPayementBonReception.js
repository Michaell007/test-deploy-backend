import Fournisseur from "../../../models/fournisseur";
import BonReception from "../../../models/bonReception";
import CompteBanque from "../../../models/compteBanque";
import PayementFournisseur from "../../../models/payementFournisseur";
import CompteFournisseur from "../../../models/compteFournisseur";
import Devise from "../../../models/devise";

export default async ({ body, params }, res, next) => {
    try {
        const bonReception = await BonReception.findOne({ where: { id: params.id}})
        if(bonReception == null){
            return res.sendUserError("BonReception non reconu!")
        }

        const fournisseur = await Fournisseur.findOne({ where: { id: bonReception.FournisseurId}})
        if(fournisseur == null){
            return res.sendUserError("Fournisseur non reconu!")
        }

        if(bonReception.accompte === bonReception.montantTotal || bonReception.etat === "Terminé"){
            return res.sendUserError("Bon reception déjà soldée!")
        }

        const devise = await Devise.findOne({where:{ id: body.deviseId}})
        if(devise == null){
            return res.sendUserError("Devise indisponible...")
        }

        const compteExiste = await CompteBanque.findOne({where: { DirectionId: bonReception.DirectionId}});
        if(compteExiste == null){
            return res.sendUserError("Compte banque indisponible!")
        }
        else if(compteExiste.montant < parseInt(body.montant) * devise.valeur){
            return res.sendUserError("Impossible fond insuffisant!")
        }

        if(bonReception.montantTotal - bonReception.accompte < parseInt(body.montant) * devise.valeur){
            body.montant = bonReception.montantTotal - bonReception.accompte
        }



        const payementFournisseur = await PayementFournisseur.create({
            DirectionId: bonReception.DirectionId,
            payementMode: body.modePayement,
            montant: parseInt(body.montant) * devise.valeur,
            valeurDevise: devise.valeur,
            FournisseurId: fournisseur.id,
            BonReceptionId: bonReception.id,
            DeviseId: devise.id
            //UserId:
        });

        const compteFournisseurExist = await CompteFournisseur.findOne({where: { FournisseurId: bonReception.FournisseurId}});
        if(compteFournisseurExist == null){
            await CompteFournisseur.create({
                montantRestant: bonReception.montantTotal - bonReception.accompte - payementFournisseur.montant,
                FournisseurId: bonReception.FournisseurId
            })
        }
        else{
            await compteFournisseurExist.update({
                montantRestant: compteFournisseurExist.montantRestant - payementFournisseur.montant
            })
        }

        await compteExiste.update({
            montant: compteExiste.montant - payementFournisseur.montant
        })

        await bonReception.update({
            accompte: bonReception.accompte + payementFournisseur.montant
        })

        if(payementFournisseur.montant >= bonReception.montantTotal || bonReception.accompte === bonReception.montantTotal){
            await bonReception.update({
                etat: "Terminé",
            });
        }

        return res.json({
            success: true,
            payementFournisseur: payementFournisseur
        });


    } catch (error) {
        return next(error)
    }
}