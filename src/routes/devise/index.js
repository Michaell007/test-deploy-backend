import { Router } from 'express';
import { middleware as body } from 'bodymen';
import {
    deviseAdd,
    getDetailsDevise,
    updateDevise,
    getListDevise,
    deviseDelete
} from "./controllers";
import {DataTypes} from "sequelize";
//import {token} from "../../services/passport";

const router = new Router();

router.post('/add',
    //token({ required: true, habilitation: "ADD_ARTICLE"}),
    body({
        libelle: {
            type: String,
            trim: true,
            required: true
        },
        valeur: {
            type: DataTypes.FLOAT,
            required: true
        }
    }), deviseAdd)

router.put('/edit/:id',
    //token({ required: true, admin_super: true }),
    body({
        libelle: {
            type: String,
            trim: true,
            required: true
        },
        valeur: {
            type: String,
            required: true
        }
    }), updateDevise)

router.get('/liste',
    //token({ required: true}),
    getListDevise)

router.get('/:id',
    //token({ required: true}),
    getDetailsDevise)

router.delete('/delete/:id',
    //token({ required: true}),
    deviseDelete)

export default router;