import Pays from "../../../models/pays";

export default async ({params},res, next) => {
    try {

        let liste = await Pays.findAll({});

        return res.json({
            succes: true,
            details: liste
        })

    } catch (error) {
        return next(error)
    }

}