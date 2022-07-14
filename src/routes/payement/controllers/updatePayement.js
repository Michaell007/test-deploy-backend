import Payement from "../../../models/facture";
import Client from "../../../models/client";
import Facture from "../../../models/facture";
import CaisseDirection from "../../../models/caisseDirection";

export default async ({ body, params }, res, next) => {
    try {

        const payement = await Payement.findOne({ where: { id: params.id} }) ;
        if (payement == null){
            return res.sendUserError("Payement incorrect!");
        }

        const facture = await Facture.findOne({ where: { id: payement.FactureId}})
        if(facture == null){
            return res.sendUserError("Facture non reconu!")
        }

        const client = await Client.findOne({ where: { id: payement.ClientId}})
        if(client == null){
            return res.sendUserError("Client non reconu!")
        }

        if(body.montant === facture.montantTotalTTC || facture.solde === true){
            return res.sendUserError("Facture déjà soldée!")
        }

        const caisseExist = await CaisseDirection.findOne({where: { DirectionId: payement.DirectionId}});
        if(caisseExist == null){
            return res.sendUserError("Caisse non disponible!")
        }

        caisseExist.update({
            montant: caisseExist.montant - payement.montant
        })

        payement.update({
            payementMode: body.modePayement,
            montant: body.montant,
            ClientId: client.id,
            FactureId: facture.id,
            //UserId:
        });

        caisseExist.update({
            montant: caisseExist.montant + payement.montant
        })

        if(payement.montant === facture.montantTotalTTC){
            await facture.update({
                solde: true
            });
        }

        return res.json({
            success: true,
            payement: payement
        });


    } catch (error) {
        return next(error)
    }
}