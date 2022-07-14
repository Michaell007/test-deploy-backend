import GroupeHabilitation from "../../../models/groupeHabilitation/index.";

export default async ({ body, params }, res, next) => {
    try {

        // check role
        const groupeHabilitaion = await GroupeHabilitation.findOne({ where: { id: params.id } });
        if (groupeHabilitaion == null) {
            return res.sendUserError('Groupe Habilitation incorrect.');
        }

        let objlist = []
        for (let i = 0; i < body.listhabilitation.length; i++) {
            objlist.push(body.listhabilitation[i])
        }

        // control data body and update
        await groupeHabilitaion.update({
            libelle: body.libelle,
            habilitation: objlist
        });

        return res.json({
            succes: true,
            results: groupeHabilitaion
        })

    } catch (error) {
        next(error)
    }
}