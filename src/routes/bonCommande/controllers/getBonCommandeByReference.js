// import BonCommande from "../../../models/bonCommande";
//
// export default async ({ params }, res, next) => {
//     try {
//         let bonCommandes = await BonCommande.findOne({
//             where: ({refBDC: params.reference}),
//             include:[{all: true, nest: true}]
//         });
//
//         if (bonCommandes == null) {
//             return res.sendUserError('Référence du bon incorrect.');
//         }
//
//         return res.json({
//             succes: true,
//             bonCommande: bonCommandes
//         })
//
//     } catch (error) {
//         return next(error)
//     }
//
// }