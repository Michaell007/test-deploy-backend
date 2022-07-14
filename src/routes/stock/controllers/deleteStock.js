import Stock from "../../../models/stock";

export default async ({ params }, res, next) => {
    try {

        let stock = await Stock.findOne({ where: { id: params.id } });
        if (stock == null) {
            return res.sendUserError("Nom de stock incorrect.");
        }

        if(stock.quantite !== 0){
            return res.sendUserError("Ce stock contient encore des élément.");
        }
        // delete model
        await Stock.destroy({ where: { id: params.id } });

        // reload liste
        const liste = await Stock.findAll({});

        return res.json({
            succes: true,
            results: liste
        })

    } catch (error) {
        return next(error)
    }

}