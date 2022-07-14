import BonProvision from "../../../models/bonProvision";

export default async ({ params }, res, next) => {
    try {

        let bonProvision = await BonProvision.findAll({ where: ({ShowroomId: params.id}) ,
            include:[{all: true, nest: true}]
        });
        if (bonProvision == null) {
            return res.sendUserError('Showroom incorrect.');
        }

        return res.json({
            succes: true,
            bonProvision: bonProvision
        })

    } catch (error) {
        return next(error)
    }

}