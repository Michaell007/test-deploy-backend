import _ from "lodash";
import Fournisseur from "../../../models/fournisseur";

export default async ({ body, params }, res, next) => {

    try {
        // check user
        const fournisseur = await Fournisseur.findOne({ where: { id: params.id } });
        if (fournisseur == null) {
            return res.sendUserError("Nom de fournisseur incorrect.");
        }


        const fournisseurExist = await Fournisseur.findOne({ where: { libelle: body.libelle } });
        if ((fournisseurExist != null) && (fournisseur.libelle !== body.libelle)) {

            return res.sendUserError("Cet fournisseur existe déjà.");
        }

        // control data body and update
        const payload = _.pick(body, ['nom', 'email', 'phone', 'pays', 'personne', 'modalitePayement']);

        await fournisseur.update(payload);

        // reload data
        let newData = await Fournisseur.findOne({ where: { id: params.id }});

        return res.json({
            succes: true,
            results: newData
        })

    } catch (error) {
        next(error)
    }
}