import _ from "lodash";
import GroupeHabilitation from "../../../models/groupeHabilitation/index.";
export default async ({ bodymen: { body }}, res, next) => {
    try {
        body.libelle = _.toUpper(body.libelle);

        const libelleExist = await GroupeHabilitation.findOne({where: {libelle: body.libelle}});
        if (libelleExist !== null) {
            return res.sendUserError("Ce groupe d'user_GroupeHabilitation existe déjà!");
        }

        let objlist = []
        for (let i = 0; i < body.listhabilitation.length; i++) {
            objlist.push(body.listhabilitation[i])
        }

        const groupeHabilitation = await GroupeHabilitation.create({
            libelle: body.libelle,
            habilitation: objlist
        });


        res.json({
            succes: true,
            results: groupeHabilitation
        })

    } catch (error) {
        return next(error)
    }
}