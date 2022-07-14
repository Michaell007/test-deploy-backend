import Sortie from "../../../models/facture";

export default async ({ params }, res, next) => {
    try {

        let sortie = await Sortie.findAll({ where: ({ShowroomId: params.id}) ,
            include:[{all: true, nest: true}]
        });
        if (sortie == null) {
            return res.sendUserError('Showroom incorrect.');
        }

        return res.json({
            succes: true,
            sortie: sortie
        })

    } catch (error) {
        return next(error)
    }

}