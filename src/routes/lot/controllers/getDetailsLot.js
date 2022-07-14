import Lot from "../../../models/lot";

export default async ({ params }, res, next) => {
    try {

        let lot = await Lot.findOne({ where: ({ id: params.id }), include:[{all: true, nest: true}]});
        if (lot == null) {
            return res.sendUserError('Lot incorrect.');
        }

        return res.json({
            succes: true,
            lot: lot
        })

    } catch (error) {
        return next(error)
    }

}