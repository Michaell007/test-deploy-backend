import Lot from "../../../models/lot";

export default async ({params},res, next) => {
    try {

        let liste = await Lot.findAll({
            order: [['createdAt', 'DESC']]
        });

        return res.json({
            succes: true,
            details: liste
        })

    } catch (error) {
        return next(error)
    }

}