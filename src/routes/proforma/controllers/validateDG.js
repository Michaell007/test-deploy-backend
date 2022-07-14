import Proforma from "../../../models/proforma";
import Taxe from "../../../models/taxeTVA";
import DetailsProforma from "../../../models/detailsProforma";
import PrixClient from "../../../models/prix";
import Client from "../../../models/client";
import ParametreClient from "../../../models/parametreClient";
//import _ from "lodash";

export default async ({ params, body }, res, next) => {
    try {

        const proforma = await Proforma.findOne({where: { id: params.id }})
        if(proforma == null){
            return res.sendUserError("Proforma est incorrect")
        }

        if(proforma.validateByDG === true){
            return res.sendUserError("Proforma déjà validée")
        }

        if(body.etat === "Réjeté"){
            if (body.commentaire == null || body.commentaire === ""){
                return res.sendUserError("Veillez sasir le motif de votre refus")
            }

            await proforma.update({
                etat: "Annulé",
                commentaire: body.commentaire,
                validateByDG: false,
            });

            return res.json({
                success: true,
                proforma: proforma
            })
        }

        let details = await DetailsProforma.findAll({where: {ProformaId: proforma.id}})
        if(details == null){
            return res.sendUserError("Pas details pour cette proforma")
        }

        const client = await Client.findOne({ where: { id: proforma.ClientId}})
        if(client == null){
            return res.sendUserError("Client non reconu!")
        }

        const paramClient = await ParametreClient.findOne({where: { ClientId: client.id}});
        if(paramClient == null){
            return res.sendUserError("Parametre du client indisponible!")
        }

        await proforma.update({
            montantTotalHT: 0,
            montantTotalTaxe: 0,
            montantTotalRemise: 0,
            montantTotalTTC: 0

        });

        //Création de detail Entrée
        for (let i = 0; i < details.length; i++) {
            let taxe;
            if(paramClient.exenoreTaxe === true || body.exonere === true){
                taxe = await Taxe.findOne({where: { taux: 0}})
                if(taxe == null){
                    return res.sendUserError("Cette taxe est incorrect!")
                }
            }
            else{
                if(paramClient.TaxeId !== null){
                    taxe = await Taxe.findOne({ where: {id: paramClient.TaxeId}})
                    if(taxe == null){
                        return res.sendUserError("Cette taxe est incorrect!")
                    }
                }
                else{
                    taxe = await Taxe.findOne({ where: {id: body.detailsSell[i].taxeId}})
                    if(taxe == null){
                        return res.sendUserError("Cette taxe est incorrect!")
                    }
                }
            }

            const prix = await PrixClient.findOne({ where: { CategoryClientId: client.CategoryClientId, ArticleId: details[i].ArticleId}});
            if(prix == null){
                return res.sendUserError("Prix non disponible pour ce article")
            }

            await details[i].update({
                quantite: parseInt(body.detailsSell[i].quantite),
                prix: prix.intitule,
                TaxeId: taxe.id,
                remise: body.detailsSell[i].remise,
                montant: (parseInt(body.detailsSell[i].quantite) * prix.intitule),
            });

            await proforma.update({
                montantTotalRemise: proforma.montantTotalRemise + (((parseInt(body.detailsSell[i].quantite) * prix.intitule) * details[i].remise) / 100)
            });

            await proforma.update({
                montantTotalHT: proforma.montantTotalHT + details[i].montant - proforma.montantTotalRemise
            });

            await proforma.update({
                montantTotalTaxe: proforma.montantTotalTaxe + ((proforma.montantTotalHT * taxe.taux) / 100)
            });
        }

        if(body.taxeTotal !== undefined){
            await proforma.update({
                taxeTotal: parseInt(body.tvaTotal),
                remiseTotal: parseInt(body.remiseFixe),
                montantTotalRemise: proforma.montantTotalRemise + proforma.montantTotalRemise,
            });

            await proforma.update({
                montantTotalHT: proforma.montantTotalHT - proforma.montantTotalRemise,
            });

            await proforma.update({
                montantTotalTaxe: proforma.montantTotalTaxe + ((proforma.montantTotalHT * body.taxeTotal) / 100)
            });
        }


        await proforma.update({
            validateByDG: true,
            commentaire: body.commentaire,
            montantTotalTTC: proforma.montantTotalHT + proforma.montantTotalTaxe
        });


        return res.json({
            success: true,
            proforma: proforma
        })


    } catch (error) {
        return next(error)
    }
}