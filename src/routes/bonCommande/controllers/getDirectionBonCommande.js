import BonCommande from "../../../models/bonCommande";

export default async ({ params }, res, next) => {
    try {

        let bonCommande = await BonCommande.findAll({ where: ({DirectionId: params.id}) ,
            include:[{all: true, nest: true}]
        });
        if (bonCommande == null) {
            return res.sendUserError('Direction incorrect.');
        }

        return res.json({
            succes: true,
            bonCommande: bonCommande
        })

    } catch (error) {
        return next(error)
    }

}