import Devise from "../../../models/devise";

export default async ({params},res, next) => {
    try {

        let liste = await Devise.findAll({
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