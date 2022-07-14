//import _ from "lodash";
import Client from "../../../models/client";
import CompteClient from "../../../models/compteClient";
import ParametreClient from "../../../models/parametreClient";
import CategoryClient from "../../../models/categoryClient";

export default async ({ bodymen: { body }}, res, next) => {
    try {
        const libelleExist = await Client.findOne({ where: { libelle: body.libelle} });
        if (libelleExist !== null) {
            return res.sendUserError("Ce nom de client est déjà utilisé.");
        }

        const client = await Client.create(body);

        const catClient = await CategoryClient.findOne({ where:{ id: body.CategoryClientId}})
        if(catClient.libelle === "Divers"){
            await client.update({
                libelle: catClient.libelle,
                telephone: "",
                email: "",
                localisation: "",
            })

            body.parametreClient.modalitePayement = null;
            body.parametreClient.montantPlafond = 1000000000000;
        }

        await CompteClient.create({
            montant: 0,
            montantPlafond: body.parametreClient.montantPlafond,
            montantRestant: 0,
            ClientId: client.id
        })


        await ParametreClient.create({
            adresseExpedition: body.parametreClient.adresseExpedition,
            exenoreTaxe: body.parametreClient.exenoreTaxe,
            modalitePayement: body.parametreClient.modalitePayement,
            representant: body.parametreClient.representant,
            TaxeId: body.parametreClient.taxeId,
            ClientId: client.id
        })

        return res.json({
            success: true,
            client: client
        })

    } catch (error) {
        return next(error)
    }
}