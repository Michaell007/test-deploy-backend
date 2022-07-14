import { Router } from 'express'
import { sendHttpError } from '../middleware'

import auth from './auth'
import user from './user'
import Role from "./role";
import CategoryArticle from "./categoryArticle";
import Article from "./article";
import Showroom from "./showroom";
import Stock from "./stock";
/*
import BonSortie from "./facture";
*/
import BonCommande from "./bonCommande";
import BonReception from "./bonReception";
// import DetailsSortie from "./detailsSortie";
import DetailsBonCommande from "./detailsBonCommande";
//import Ventes from "./vente";
import StockDirection from "./stockDirection";
import Direction from "./direction";
import Pays from "./pays";
// import DetailsVentes from "./detailsVentes";
import Fournisseur from "./fournisseur";
import GroupeHabilitation from "./groupeHabilitation";
import CategoryClient from "./categoryClient";
import BonProvision from "./bonProvision";
import BonEntree from "./bonEntree";
import BonSortieInterne from "./bonSortieInterne";
import Proforma from "./proforma";
import Client from "./client";
import Taxe from "./taxeTVA";
import PrixClient from "./prixClient";
import BonLivraison from "./bonLivraison";
import Facture from "./facture";
import Devise from "./devise";
import Lot from "./lot";
import Payement from "./payement";
import PayementFournisseur from "./payementFournisseur";
import Rapport from "./rapport";
import CompteBanque from "./compteBanque";


const router = new Router()


// permet de generer des erreurs perso - sendHttpError - sendUserError
router.use(sendHttpError)
// router.get('*', checkUser)
router.use('/auth', auth)
router.use('/user', user)
router.use('/role/user', Role)
router.use('/article', Article)
router.use('/category/article', CategoryArticle)
router.use('/showroom', Showroom)
router.use('/stock', Stock)
router.use('/details/boncommande', DetailsBonCommande)
router.use('/bon/commande', BonCommande)
router.use('/bon/provision', BonProvision)
router.use('/bon/reception', BonReception)
router.use('/bon/entree', BonEntree)
// router.use('/bon/sortie/details', DetailsSortie)
router.use('/facture', Facture)
router.use('/bon/sortie/interne', BonSortieInterne)
// router.use('/vente', Ventes)
// router.use('/details/vente', DetailsVentes)
router.use('/pays', Pays)
router.use('/direction', Direction)
router.use('/stock/direction', StockDirection)
router.use('/fournisseur', Fournisseur)
router.use('/goupe/habilitation', GroupeHabilitation)
router.use('/category/client', CategoryClient)
router.use('/proforma', Proforma)
router.use('/client', Client)
router.use('/taxe', Taxe)
router.use('/prix', PrixClient)
router.use('/bon/livraison', BonLivraison)
router.use('/devise', Devise)
router.use('/lot', Lot)
router.use('/rapport', Rapport)
router.use('/payement', Payement)
router.use('/payement/fournisseur', PayementFournisseur)
router.use('/compte/direction', CompteBanque)

// route test user
router.get('/test', (req, res, next) => {
    try {  
      return res.json({ success: true, message: 'test Ok' })
    } catch (error) {
      console.log(error)
    }
})

export default router
