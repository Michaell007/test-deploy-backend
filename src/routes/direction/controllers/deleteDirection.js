import Direction from "../../../models/direction";
import Showroom from "../../../models/showroom";

export default async ({ params }, res, next) => {
    try {

        let direction = await Direction.findOne({ where: { id: params.id } });
        if (direction == null) {
            return res.sendUserError("Nom de Direction incorrect.");
        }

        const showroom = await Showroom.findOne({ where: { DirectionId: params.id}})
        if (showroom !== null){
            return res.sendUserError("Impossible! Cette direction est liée à au moins un showroom.");
        }

        // delete model
        await Direction.destroy({ where: { id: params.id } });

        // reload liste
        const liste = await Direction.findAll({});

        return res.json({
            succes: true,
            results: liste
        })

    } catch (error) {
        return next(error)
    }

}