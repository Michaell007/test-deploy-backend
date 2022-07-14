import Showroom from "../../../models/showroom";

export default async ({ params }, res, next) => {
    try {

        let showroom = await Showroom.findOne({ where: { id: params.id } });
        if (showroom == null) {
            return res.sendUserError("Nom de showroom incorrect.");
        }

        // delete model
        await Showroom.destroy({ where: { id: params.id } });

        // reload liste
        const liste = await Showroom.findAll({});

        return res.json({
            succes: true,
            results: liste
        })

    } catch (error) {
        return next(error)
    }

}