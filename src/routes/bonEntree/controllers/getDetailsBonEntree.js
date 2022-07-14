import DetailsBonEntree from "../../../models/detailsBonEntree";
import BonEntree from "../../../models/bonEntree";
import Showroom from "../../../models/showroom";
import BonSortieInterne from "../../../models/bonSortieInterne";

export default async ({ params }, res, next) => {
    try {

        let bonEntree = await BonEntree.findOne({ where: ({id: params.id}) ,include: [
                {
                    model: Showroom
                },{
                    model: DetailsBonEntree,
                    include:[{all: true, nest: true}]
                },
                {
                    model: BonSortieInterne,
                    include:[{all: true, nest: true}]
                }
            ]});
        if (bonEntree == null) {
            return res.sendUserError('Entrée incorrect.');
        }

        return res.json({
            succes: true,
            bonEntree: bonEntree
        })

    } catch (error) {
        return next(error)
    }

}