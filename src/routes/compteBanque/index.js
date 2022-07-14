import { Router } from 'express';
import { middleware as body } from 'bodymen';
import { AddMoneyBanque, updateCompteBanque, getDetailsCompteBanque, getListCompteBanque, deleteCompteBanque } from "./controllers";
import {DataTypes} from "sequelize";

const router = new Router();

/**
 * Ajouter un montant a compte banquaire a partir de l'ID de la direction
 * @param DirectionID
 */
router.put('/add/:id',
    //token({ required: true}),
    body({
        montant: {
            type: DataTypes.FLOAT,
            required: true
        }
    }), AddMoneyBanque)

router.put('/edit/:id',
    //token({ required: true, admin_super: true }),
    body({
        libelle: {
            type: String,
            required: true
        },
        numero: {
            type: String,
            required: false
        },
        montant: {
            type: DataTypes.FLOAT,
            required: true
        },
        DirectionId: {
            type: Number,
            required: true
        }
    }), updateCompteBanque)

router.get('/liste',
    //token({ required: true}),
    getListCompteBanque)

router.get('/:id',
    //token({ required: true}),
    getDetailsCompteBanque)

router.delete('/delete/:id',
    //token({ required: true}),
    deleteCompteBanque)

export default router;