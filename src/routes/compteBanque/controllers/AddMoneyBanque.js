import compteBanque from "../../../models/compteBanque";
// import _ from "lodash";

export default async ({ body, params }, res, next) => {

    try {
        const compte = await compteBanque.findOne({ where: { id: params.id } });
        if (compte == null) {
            return res.sendUserError("Compte banque incorrect.");
        }

        /*const compteExiste = await compteBanque.findOne({ where: { libelle: body.libelle } });
        if ((compteExiste != null) && (compte.libelle !== body.libelle)) {
            return res.sendUserError("Compte banque existe deja.");
        }*/

        await compte.update({
            montant: body.montant
        });

        return res.json({
            succes: true,
            compte: compte
        })

    } catch (error) {
        next(error)
    }
}