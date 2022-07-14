import Devise from "../../../models/devise";

export default async ({ params }, res, next) => {
    try {

        let devise = await Devise.findOne({ where: { id: params.id } });
        if (devise == null) {
            return res.sendUserError("Devise incorrect.");
        }

        // reload liste
        const liste = await Devise.findAll({});

        return res.json({
            succes: true,
            results: liste
        })

    } catch (error) {
        return next(error)
    }

}