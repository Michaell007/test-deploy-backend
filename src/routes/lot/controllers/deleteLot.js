import Lot from "../../../models/lot";

export default async ({ params }, res, next) => {
    try {

        let lot = await Lot.findOne({ where: { id: params.id } });
        if (lot == null) {
            return res.sendUserError("Lot incorrect.");
        }

        // reload liste
        const liste = await Lot.findAll({});

        return res.json({
            succes: true,
            results: liste
        })

    } catch (error) {
        return next(error)
    }

}