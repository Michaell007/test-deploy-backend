import _ from "lodash";
import Fournisseur from "../../../models/fournisseur";
import CompteFournisseur from "../../../models/compteFournisseur";

export default async ({ bodymen: { body }}, res, next) => {
    try {
        const libelleExist = await Fournisseur.findOne({ where: { libelle: (body.libelle)} });
        if (libelleExist !== null) {

            return res.sendUserError("Ce nom de fournisseur est déjà utilisé.");
        }

        const fournisseur = await Fournisseur.create(body);

        await CompteFournisseur.create({
            montantRestant: 0,
            FournisseurId: fournisseur.id
        })

        return res.json({
            success: true,
            fournisseur: fournisseur
        })

    } catch (error) {
        return next(error)
    }
}