import { Router } from 'express';
import { middleware as body } from 'bodymen';
import { addDirection, updateDirection, getListDirection, getDetailsDirection, deleteDirection } from "./controllers";
import getDirectionCaisse from "./controllers/getDirectionCaisse";

const router = new Router();

router.post('/add',
    //token({ required: true}),
    body({
        libelle: {

            type: String,
            trim: true,
            required: true
        },
        localisation: {
            type: String,
            require: true
        },
        phone: {
            type: String,
            require: true
        },
        email: {
            type: String,
            trim: true,
            match: /^\S+@\S+\.\S+$/,
            lowercase: true,
            required: true
        },
        PaysId: {
            type: Number,
            required: true
        },
        libelleCompte: {
            type: String,
            trim: true,
            required: true
        },
        numeroCompte: {
            type: String,
            trim: true,
            required: false
        },

    }), addDirection)

router.put('/edit/:id',
    //token({ required: true, admin_super: true }),
    body({
        libelle: {

            type: String,
            trim: true,
            required: true
        },
        localisation: {
            type: String,
            require: true
        },
        phone: {
            type: String,
            require: true
        },
        email: {
            type: String,
            trim: true,
            match: /^\S+@\S+\.\S+$/,
            lowercase: true,
            required: true
        },
        PaysId: {
            type: Number,
            required: true
        }
    }), updateDirection)

router.get('/liste',
    //token({ required: true}),
    getListDirection)

router.get('/:id',
    //token({ required: true}),
    getDetailsDirection)

router.get('/caisse/:id',
    //token({ required: true}),
    getDirectionCaisse)

router.delete('/delete/:id',
    //token({ required: true}),
    deleteDirection)

export default router;