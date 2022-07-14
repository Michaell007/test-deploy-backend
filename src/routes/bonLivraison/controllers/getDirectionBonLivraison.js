import BonLivraison from "../../../models/bonLivraison";

export default async ({ params }, res, next) => {
    try {

        let bonLivraison = await BonLivraison.findAll({ where: ({DirectionId: params.id}) ,
            include:[{all: true, nest: true}]
        });
        if (bonLivraison == null) {
            return res.sendUserError('Direction incorrect.');
        }

        return res.json({
            succes: true,
            bonLivraison: bonLivraison
        })

    } catch (error) {
        return next(error)
    }

}