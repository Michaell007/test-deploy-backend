import Payement from "../../../models/payement";

export default async ({ params }, res, next) => {
    try {

        let payement = await Payement.findAll({ where: ({DirectionId: params.id}) ,
            include:[{all: true, nest: true}]
        });
        if (payement == null) {
            return res.sendUserError('Direction incorrect.');
        }

        return res.json({
            succes: true,
            payement: payement
        })

    } catch (error) {
        return next(error)
    }

}