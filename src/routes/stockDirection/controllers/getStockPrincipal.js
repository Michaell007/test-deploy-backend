import StockDirection from "../../../models/stockDirection";
import Stock from "../../../models/stock";
import Showroom from "../../../models/showroom";

export default async ({ params }, res, next) => {
    try {

        let stockDirections = await StockDirection.findAll({ where: {DirectionId: params.id}});
        if (stockDirections == null) {
            return res.sendUserError('Nom de Direction incorrect.');
        }

        let objlist = []
        objlist = stockDirections

        let showroom = await Showroom.findAll({ DirectionId: params.id})
        if(showroom == null){
            return res.sendUserError('Aucun Showroom associé a cette direction.');
        }


        for (let i = 0; i < showroom.length; i++) {
            let stockShowroom = await Stock.findAll({ where: {ShowroomId: showroom[i].id}});
            if (stockShowroom == null) {
                return res.sendUserError('Nom de Direction incorrect.');
            }

            objlist.push(stockShowroom);
        }


        return res.json({
            succes: true,
            stockDirection: objlist
        })

    } catch (error) {
        return next(error)
    }

}