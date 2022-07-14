import { HABILITATION } from "../../../config";
export default async ({ params }, res, next) => {
    try {
        // get liste
        const liste = await HABILITATION;

        return res.json({
            succes: true,
            results: liste
        })

    } catch (error) {
        return next(error)
    }

}