import Article from "../../../models/article";

export default async ({ params }, res, next) => {
    try {

        let lots = await Article.findAll({
            where: ({lot: params.lot}),
            include:[{all: true, nest: true}]
        });

        if (lots == null) {
            return res.sendUserError('Article incorrect.');
        }

        return res.json({
            succes: true,
            article: lots
        })

    } catch (error) {
        return next(error)
    }

}
