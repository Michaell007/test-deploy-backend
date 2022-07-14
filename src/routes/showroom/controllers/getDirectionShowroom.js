import Showroom from "../../../models/showroom";

export default async ({ params }, res, next) => {
    try {

        let showroom = await Showroom.findAll({
            where: ({DirectionId: params.id}),
                include:[{all: true, nest: true}]
            });

        if (showroom == null) {
            return res.sendUserError('Direction incorrect.');
        }

        return res.json({
            succes: true,
            showroom: showroom
        })

    } catch (error) {
        return next(error)
    }

}