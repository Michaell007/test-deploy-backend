import { Router } from 'express';
import { middleware as body } from 'bodymen';
import {
    addPayementBonReception,
    addPayementFournisseur,
    getListPayementFournisseur,
    getDetailsPayementFournisseur,
    // getDirectionPayementFournisseur,
    deletePayementFournisseur,
    updatePayementFournisseur,
} from "./controllers";
import { DataTypes} from "sequelize";
// import {token} from "../../services/passport";

const router = new Router();

/**
 * Direction
 * **/

router.post('/reception/:id',
    //token({ required: true, admin_gg: true, habilitation: "ADD_BONCOMMANDE"}),
    body({
        montant: {
            type: DataTypes.FLOAT,
            require: true
        },
        deviseId: {
            type: Number,
            require: true
        },
        modePayement: ""
    }), addPayementBonReception)

router.post('direction/:id',
    //token({ required: true, admin_gg: true, habilitation: "ADD_BONCOMMANDE"}),
    body({
        montant: {
            type: DataTypes.FLOAT,
            require: true
        },
        deviseId: {
            type: Number,
            require: true
        },
        modePayement: ""
    }), addPayementFournisseur)


/*router.get('/direction/:id',
    //token({ required: true}),
    getDirectionPayementFournisseur)*/

router.put('/edit/:id',
    //token({ required: true, admin_super: true }),
    body({
        montant: {
            type: DataTypes.FLOAT,
            require: true
        },
        deviseId: {
            type: Number,
            require: true
        },
        modePayement: ""
    }), updatePayementFournisseur)

/**
 * Affichage
 * **/
router.get('/liste',
    //token({ required: true}),
    getListPayementFournisseur)

router.get('/:id',
    //token({ required: true}),
    getDetailsPayementFournisseur)

router.delete('/delete/:id',
    //token({ required: true}),
    deletePayementFournisseur)


export default router;
