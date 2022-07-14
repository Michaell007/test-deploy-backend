import { Router } from 'express';
import { middleware as body } from 'bodymen';
import {
    validateByGG,
    getDetailsBonLivraison,
    getListBonLivraison,
    getDirectionBonLivraison,
    // getShowroomBonLivraison,
    deleteBonLivraison,
    getBonLivraisonEnAttente,
    getBonLivraisonTerminer
    /*updateBonLivraison*/,
    // updateBonLivraison,
} from "./controllers";
import {DataTypes} from "sequelize";
// import {token} from "../../services/passport";

const router = new Router();

/**
 * Direction
 * **/


router.put('/validate/:id',
    //token({ required: true, admin_gg: true, habilitation: "ADD_BONCOMMANDE"}),
    body({
        detailsExit: [{}],
        etat: "",
        expedition: "",
        dateLivraison: {
            type: DataTypes.DATEONLY,
            require: false
        },
        commentaire: {
            type: DataTypes.TEXT,
            require: false
        }
    }), validateByGG)



router.get('/direction/attente',
    //token({ required: true}),
    getBonLivraisonEnAttente)

router.get('/direction/termine',
    //token({ required: true}),
    getBonLivraisonTerminer)

router.get('/direction/:id',
    //token({ required: true}),
    getDirectionBonLivraison)

/*router.put('/direction/encours/edit/:id',
    //token({ required: true, admin_super: true }),
    body({
        etat: "",
        adresseLivraison: {
            type: String,
            require: false
        },
        detailsExit: [{}],
        expedition: "",
        dateLivraison: {
            type: DataTypes.DATEONLY,
            require: false
        },
        commentaire: {
            type: DataTypes.TEXT,
            require: false
        }
    }), updateBonLivraison)*/

/**
 * Affichage
 * **/
router.get('/liste',
    //token({ required: true}),
    getListBonLivraison)

router.get('/:id',
    //token({ required: true}),
    getDetailsBonLivraison)

router.delete('/delete/:id',
    //token({ required: true}),
    deleteBonLivraison)


export default router;
