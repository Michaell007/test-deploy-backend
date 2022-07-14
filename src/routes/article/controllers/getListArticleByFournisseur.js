import Article from "../../../models/article";

export default async ({ params }, res, next) => {
    try {

        let articles = await Article.findAll({
            where: ({FournisseurId: params.id}),
            include:[{all: true, nest: true}]
        });

        if (articles == null) {
            return res.sendUserError('Fournisseur incorrect.');
        }

        return res.json({
            succes: true,
            article: articles
        })

    } catch (error) {
        return next(error)
    }

}