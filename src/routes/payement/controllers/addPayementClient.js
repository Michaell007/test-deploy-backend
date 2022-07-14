import Payement from "../../../models/facture";
import Client from "../../../models/client";
import Facture from "../../../models/facture";
import CaisseDirection from "../../../models/caisseDirection";
import CompteClient from "../../../models/compteClient";

export default async ({ body, params }, res, next) => {
    try {
        const client = await Client.findOne({ where: { id: params.id}})
        if(client == null){
            return res.sendUserError("Client non reconu!")
        }

        const facture = await Facture.findOne({ where: { ClientId: client.id}})
        if(facture == null){
            return res.sendUserError("Aucune facture n'est associée a ce client!")
        }

        if(facture.montantRestantClient <= 0 || facture.solde === true){
            return res.sendUserError("Facture déjà soldée!")
        }

        const payement = await Payement.create({
            DirectionId: facture.DirectionId,
            payementMode: body.modePayement,
            montant: body.montant,
            ClientId: client.id,
            FactureId: facture.id
            //UserId:
        });

        if(facture.montantRestantClient < payement.montant){
            payement.montant = facture.montantRestantClient
        }
        const caisseExist = await CaisseDirection.findOne({where: { DirectionId: facture.DirectionId}});
        if(caisseExist == null){
            await CaisseDirection.create({
                montant: payement.montant,
                DirectionId: facture.DirectionId
            })
        }
        else{
            caisseExist.update({
                montant: caisseExist.montant + payement.montant
            })
        }

        const compteClientExist = await CompteClient.findOne({where: { ClientId: facture.ClientId}});
        if(compteClientExist == null){
            await CompteClient.create({
                montant: payement.montant,
                montantRestant: facture.montantTotalTTC - payement.montant,
                ClientId: facture.ClientId
            })
        }
        else{
            compteClientExist.update({
                montant: compteClientExist.montant + payement.montant,
                montantRestant: compteClientExist.montantRestant - payement.montant
            })
        }
        await facture.update({
            montantRestantClient: facture.montantRestantClient - payement.montant
        })

        if(payement.montant >= facture.montantTotalTTC || facture.montantRestantClient <= 0){
            await facture.update({
                etat: "Terminé",
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