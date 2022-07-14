import BonReception from "../../../models/bonReception";

export default async ({ params }, res, next) => {
    try {

        let bonReception = await BonReception.findAll({ where: ({etat: "En cours"}) ,
            include:[{all: true, nest: true}]
        });
        if (bonReception == null) {
            return res.sendUserError('Bon de reception incorrect.');
        }

        return res.json({
            succes: true,
            bonReception: bonReception
        })

    } catch (error) {
        return next(error)
    }

}