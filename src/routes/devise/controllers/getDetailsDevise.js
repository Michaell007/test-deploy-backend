import Devise from "../../../models/devise";

export default async ({ params }, res, next) => {
    try {

        let devise = await Devise.findOne({ where: ({ id: params.id }), include:[{all: true, nest: true}]});
        if (devise == null) {
            return res.sendUserError('Devise incorrect.');
        }

        return res.json({
            succes: true,
            devise: devise
        })

    } catch (error) {
        return next(error)
    }

}