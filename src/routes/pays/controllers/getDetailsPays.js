import Pays from "../../../models/pays";
import Direction from "../../../models/direction";
//import _ from "lodash";

export default async ({ params }, res, next) => {
    try {

        let pays = await Pays.findOne({ where: ({ id: params.id })});
        if (pays == null) {
            return res.sendUserError('Nom de Pays incorrect.');
        }

        return res.json({
            succes: true,
            pays: pays
        })

    } catch (error) {
        return next(error)
    }

}