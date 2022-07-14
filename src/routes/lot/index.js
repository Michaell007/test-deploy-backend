import { Router } from 'express';
import { middleware as body } from 'bodymen';
import {
    getDetailsLot,
    updateLot,
    getListLot,
    deleteLot
} from "./controllers";
import {DataTypes} from "sequelize";
//import {token} from "../../services/passport";

const router = new Router();

router.put('/edit/:id',
    //token({ required: true, admin_super: true }),
    body({
        libelle: {
            type: String,
            trim: true,
            required: true
        },
        quantite: {
            type: Number,
            required: true
        },
        datePeremption: {
            type: DataTypes.DATEONLY,
            required: true
        }
    }), updateLot)

router.get('/liste',
    //token({ required: true}),
    getListLot)

router.get('/:id',
    //token({ required: true}),
    getDetailsLot)

router.delete('/delete/:id',
    //token({ required: true}),
    deleteLot)

export default router;