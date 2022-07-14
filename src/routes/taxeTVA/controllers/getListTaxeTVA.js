import Taxe from "../../../models/taxeTVA";

export default async ({params},res, next) => {
    try {

        let liste = await Taxe.findAll({});

        return res.json({
            succes: true,
            details: liste
        })

    } catch (error) {
        return next(error)
    }

}