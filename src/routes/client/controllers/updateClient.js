import _ from "lodash";
import Client from "../../../models/client";
import ParametreClient from "../../../models/parametreClient";
import CompteClient from "../../../models/compteClient";

export default async ({ body, params }, res, next) => {

    try {
        // check user
        const client = await Client.findOne({ where: { id: params.id } });
        if (client == null) {
            return res.sendUserError("Nom de client incorrect.");
        }

        const clientExist = await Client.findOne({ where: { libelle: body.libelle } });
        if ((clientExist != null) && (client.libelle !== body.libelle)) {
            return res.sendUserError("Cet client existe déjà.");
        }

        let compteClient = await CompteClient.findOne({where: {ClientId: client.id}});
        if(compteClient == null){
            return res.sendUserError("Aucun paramètre associé a ce client")
        }

        await compteClient.update({
            montantPlafond: body.parametreClient.montantPlafond
        })

        let parametreClient = await ParametreClient.findOne({where: {ClientId: client.id}});
        if(parametreClient == null){
            return res.sendUserError("Aucun paramètre associé a ce client")
        }

        await parametreClient.update({
            adresseExpedition: body.parametreClient.adresseExpedition,
            exenoreTaxe: body.parametreClient.exenoreTaxe,
            modalitePayement: body.parametreClient.modalitePayement,
            representant: body.parametreClient.representant,
            TaxeId: body.parametreClient.taxeId
        })

        // control data body and update
        const payload = _.pick(body, ['libelle', 'telephone', 'email', 'localisation', 'CategoryClientId']);

        await client.update(payload);

        // reload data
        let newData = await Client.findOne({ where: { id: params.id }});

        return res.json({
            succes: true,
            results: newData
        })

    } catch (error) {
        next(error)
    }
}