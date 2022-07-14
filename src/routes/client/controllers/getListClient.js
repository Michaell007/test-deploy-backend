import Client from "../../../models/client";
import CategoryClient from "../../../models/categoryClient";
import BonSortie from "../../../models/facture";
import ParametreClient from "../../../models/parametreClient";
import CompteClient from "../../../models/compteClient";

export default async ({params},res, next) => {
    try {

        let liste = await Client.findAll({
            include:[ {
                model: CategoryClient
            },
                {
                    model: ParametreClient
                },
                {
                    model: CompteClient
                }]
        });

        return res.json({
            succes: true,
            details: liste
        })

    } catch (error) {
        return next(error)
    }

}