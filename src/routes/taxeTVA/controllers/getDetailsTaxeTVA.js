import Taxe from "../../../models/taxeTVA";

export default async ({ params }, res, next) => {
    try {

        let taxeTVA = await Taxe.findOne({ where: ({ id: params.id })});
        if (taxeTVA == null) {
            return res.sendUserError('Nom de taxeTVA incorrect.');
        }

        return res.json({
            succes: true,
            taxeTVA: taxeTVA
        })

    } catch (error) {
        return next(error)
    }

}