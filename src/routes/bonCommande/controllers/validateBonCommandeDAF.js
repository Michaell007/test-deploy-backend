import BonCommande from "../../../models/bonCommande";
//import DetailsBonCommande from "../../../models/detailsBonCommande";
//import BonReception from "../../../models/bonReception";
//import DetailsBonReception from "../../../models/detailsBonReception";
//import _ from "lodash";

export default async ({ params, body }, res, next) => {
    try {

        const bonCommande = await BonCommande.findOne({where: { id: params.id }})
        if(bonCommande == null){
            return res.sendUserError("Le bon de commande est incorrect")
        }

        if(body.etat === "Réjeté"){
            if (body.commentaire == null || body.commentaire === ""){
                return res.sendUserError("Veillez sasir le motif de votre refus")
            }
            await bonCommande.update({
                validateByDAF: false,
                commentaire: body.commentaire
            });

            return res.json({
                success: true,
                bonCommande: bonCommande
            })
        }

        if(body.etat !== "En cours"){
            return res.sendUserError("Veillez valider ou refuser le bon de commande")
        }

        if( bonCommande.validateByDAF === true){
            return res.sendUserError("Ce bon est déjà validé")
        }

        await bonCommande.update({
            validateByDAF: true,
            commentaire: body.commentaire
        });


        return res.json({
            success: true,
            bonCommande: bonCommande
        })


    } catch (error) {
        return next(error)
    }
}