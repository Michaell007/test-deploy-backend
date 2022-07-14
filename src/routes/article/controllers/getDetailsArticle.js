import Article from "../../../models/article";

export default async ({ params }, res, next) => {
    try {

        let article = await Article.findOne({ where: ({ id: params.id }), include: [{
                all: true, nest: true
            }]});
        if (article == null) {
            return res.sendUserError('Article incorrect.');
        }

        return res.json({
            succes: true,
            article: article
        })

    } catch (error) {
        return next(error)
    }

}