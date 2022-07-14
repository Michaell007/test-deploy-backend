import Facture from "../../../models/facture";
// import CompteClient from "../../../models/compteClient";
import Client from "../../../models/client";

export default async ({ params }, res, next) => {
    try {
        let factures = await Facture.findAll({where: ({ClientId: params.id}) ,include: [{
                model: Client,
                // include:[{all: true, nest: true}]
            }]});

        let objlist = []
        for (let i = 0; i < factures.length; i++) {
            if(factures[i].solde === true && factures[i].payementMode === "reglementJour"){
                objlist.push(factures[i])
            }
        }

        return res.json({
            succes: true,
            facture: objlist
        })

    } catch (error) {
        return next(error)
    }

}
