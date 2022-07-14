import { Router } from 'express';
import { middleware as body } from 'bodymen';
import {
    addPayementFacture,
    addPayementClient,
    getListPayement,
    getDetailsPayement,
    getDirectionPayement,
    deletePayement,
    updatePayement,
} from "./controllers";
import { DataTypes} from "sequelize";
// import {token} from "../../services/passport";

const router = new Router();

/**
 * Direction
 * **/

router.post('/direction/facture/:id',
    //token({ required: true, admin_gg: true, habilitation: "ADD_BONCOMMANDE"}),
    body({
        modePayement: {
           type: String
        },
        montant: {
            type: DataTypes.FLOAT,
            require: true
        }
    }), addPayementFacture)

router.post('/direction/client/:id',
    //token({ required: true, admin_gg: true, habilitation: "ADD_BONCOMMANDE"}),
    body({
        modePayement: {
            type: String
        },
        montant: {
            type: DataTypes.FLOAT,
            require: true
        }
    }), addPayementClient)


router.get('/direction/:id',
    //token({ required: true}),
    getDirectionPayement)

router.put('/direction/encours/edit/:id',
    //token({ required: true, admin_super: true }),
    body({
        modePayement: {
            type: String
        },
        montant: {
            type: DataTypes.FLOAT,
            require: true
        }
    }), updatePayement)

/**
 * Affichage
 * **/
router.get('direction/liste',
    //token({ required: true}),
    getListPayement)

router.get('direction/:id',
    //token({ required: true}),
    getDetailsPayement)

router.delete('direction/delete/:id',
    //token({ required: true}),
    deletePayement)


export default router;
