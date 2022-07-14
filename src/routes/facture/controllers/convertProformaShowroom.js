import Facture from "../../../models/facture";
import DetailsFacture from "../../../models/detailsFacture";
import Proforma from "../../../models/proforma";
import BonLivraison from "../../../models/bonLivraison";
import DetailsBonLivraison from "../../../models/detailsBonLivraison";
import Payement from "../../../models/payement";
import CaisseDirection from "../../../models/caisseDirection";
import CompteClient from "../../../models/compteClient";
import DetailsProforma from "../../../models/detailsProforma";
import Client from "../../../models/client";
import ParametreClient from "../../../models/parametreClient";

export default async ({ body, params }, res, next) => {
    try {

        const proforma = await Proforma.findOne({ where: { id: params.id}}) ;
        if (proforma == null){
            return res.sendUserError("Cette proforma n'existe pas");
        }

        const client = await Client.findOne({ where: { id: proforma.ClientId}})
        if(client == null){
            return res.sendUserError("Client non reconu!")
        }

        const paramClient = await ParametreClient.findOne({where: { ClientId: client.id}});
        if(paramClient == null){
            return res.sendUserError("Parametre du client indisponible!")
        }

        if(paramClient.modalitePayement !== null){
            body.payementMode = "reglementJour";
            body.delais = paramClient.modalitePayement;
        }

        if(paramClient.representant !== null){
            body.representant = paramClient.representant;
        }

        if(body.payementMode === "reglementJour" && proforma.validateByDG === false){
            await proforma.update({
                accordClient: false,
                delais: body.delais
            });

            return res.sendUserError("Affichez un message Direction")
        }

        const date = new Date()

        if(body.payementMode === "reglementJour" && proforma.validateByDG === true || body.payementMode === "Cash"){
            if (body.etat !== "Terminé"){
                return res.sendUserError("Facture en edition")
            }

            var facture = await Facture.create({
                payementMode: body.payementMode,
                representant: body.representant,
                refFACT: "FACT00" + proforma.id + "-" + date.getFullYear(),
                ShowroomId: proforma.ShowroomId,
                etat: "En Attente",
                montantTotalHT: proforma.montantTotalHT,
                montantTotalTaxe: proforma.montantTotalTaxe,
                montantTotalTTC: proforma.montantTotalTTC,
                montantRestantClient: proforma.montantTotalTTC,
                montantTotalRemise: proforma.montantTotalRemise,
                ClientId: proforma.ClientId,
                remiseTotal: proforma.remiseTotal,
                taxeTotal: proforma.taxeTotal,
                adresseFacturation: proforma.adresseFacturation,
                solde: false,
                reglementCash: true,
                ProformaId: proforma.id,
                reglementJour: 0,
                //UserId:
            });

            let detailsProformas = await DetailsProforma.findAll({ where: { ProformaId: proforma.id}})
            if(detailsProformas == null){
                return res.sendUserError("Aucun detail associé a cette Proforma")
            }
            //Création de detail Entrée
            for (let i = 0; i < detailsProformas.length; i++) {
                let detailsElementShowroom = [];
                detailsElementShowroom[i] = await DetailsFacture.create({
                    ArticleId: detailsProformas[i].ArticleId,
                    FactureId: facture.id,
                    quantite: detailsProformas[i].quantite,
                    prix: detailsProformas[i].prix,
                    TaxeId: detailsProformas[i].TaxeId,
                    remise: detailsProformas[i].remise,
                    montant: detailsProformas[i].montant
                });

            }

            let bonLivraison = await BonLivraison.create({
                refBL: "BL00" + proforma.id +"_" + date.getFullYear(),
                ShowroomId: proforma.ShowroomId,
                etat: "En Attente",
                ClientId: facture.ClientId,
                FactureId: facture.id,
                adresseLivraison: proforma.adresseLivraison,
                quantiteTotal: 0,
                montantTotal: proforma.montantTotalTTC
                //UserId:
            });

            for (let i = 0; i < detailsProformas.length; i++) {
                let detailsLivraisonShowroom = [];
                detailsLivraisonShowroom[i] = await DetailsBonLivraison.create({
                    ArticleId: detailsProformas[i].ArticleId,
                    BonLivraisonId: bonLivraison.id,
                    quantiteCmd: detailsProformas[i].quantite,
                    quantiteLivre: 0,
                    prix: detailsProformas[i].prix,
                    montant: detailsProformas[i].quantite * detailsProformas[i].prix,
                });

                await bonLivraison.update({
                    quantiteTotal: bonLivraison.quantiteTotal + detailsLivraisonShowroom[i].quantiteCmd,
                });
            }

            await proforma.update({
                accordClient: true,
                etat: "Terminé"
            });
        }

        if(body.payementMode !== "Cash"){
            const compteClientExist = await CompteClient.findOne({where: { ClientId: facture.ClientId}});
            if(compteClientExist == null){
                await CompteClient.create({
                    montant: 0,
                    montantRestant: facture.montantTotalTTC,
                    ClientId: facture.ClientId
                })
            }
            else{
                compteClientExist.update({
                    montantRestant: compteClientExist.montantRestant + facture.montantTotalTTC
                })
            }

            await facture.update({
                reglementJour: proforma.delais,
                reglementCash: false
            });

            return res.json({
                success: true,
                facture: facture
            });
        }

        // let dateJour = new Date
        await Payement.create({
            ShowroomId: facture.ShowroomId,
            payementMode: facture.payementMode,
            montant: facture.montantTotalTTC,
            ClientId: facture.ClientId,
            FactureId: facture.id,
            //UserId:
        });
        //

        const caisseExist = await CaisseDirection.findOne({where: { ShowroomId: facture.ShowroomId}});
        if(caisseExist == null){
            await CaisseDirection.create({
                montant: facture.montantTotalTTC,
                ShowroomId: facture.ShowroomId
            })
        }
        else{
            caisseExist.update({
                montant: caisseExist.montant + facture.montantTotalTTC
            })
        }

        const compteClientExist = await CompteClient.findOne({where: { ClientId: facture.ClientId}});
        if(compteClientExist == null){
            await CompteClient.create({
                montant: facture.montantTotalTTC,
                montantRestant: facture.montantTotalTTC - facture.montantTotalTTC,
                ClientId: facture.ClientId
            })
        }
        else{
            compteClientExist.update({
                montant: compteClientExist.montant + facture.montantTotalTTC,
                montantRestant: compteClientExist.montantRestant - facture.montantTotalTTC
            })
        }

        await facture.update({
            etat: body.etat,
            solde: true,
            montantRestantClient: facture.montantRestantClient - facture.montantTotalTTC
        });

        return res.json({
            success: true,
            facture: facture
        });


    } catch (error) {
        return next(error)
    }
}