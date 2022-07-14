import CompteBanque from "../../../models/compteBanque";
// import Direction from "../../../models/direction";

export default async ({ params }, res, next) => {
    try {

        let categories = await CompteBanque.findOne({ where: { id: params.id } });
        if (categories == null) {
            return res.sendUserError("Compte de Direction incorrect.");
        }

        /*let directions = await Direction.findAll({where: { CompteBanqueId: categories.id}})
        if (directions !== [] || directions !== null){
            return res.sendUserError("Impossible! Cette categorie contient des éléments.");
        }*/

        // delete model
        await CompteBanque.destroy({ where: { id: params.id } });

        // reload liste
        const liste = await CompteBanque.findAll({});

        return res.json({
            succes: true,
            results: liste
        })

    } catch (error) {
        return next(error)
    }

}