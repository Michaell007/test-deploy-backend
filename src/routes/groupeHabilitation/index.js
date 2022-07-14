import { Router } from 'express';
import { middleware as body } from 'bodymen';
import {
    createGrpeHabilitation,
    updateGrpeHabilitation,
    getListeGrpeHabilitation,
    getDetailsGrpeHabilitation,
    deleteGrpeHabilitation,
    listHabilitation
} from "./controllers";
import {token} from "../../services/passport";

const router = new Router();


router.post('/create',
    //token({ required: true, admin_super: true, admin_dg: true }),
    body({
        libelle: {
            type: String,
            required: true
        },
        listhabilitation: [],
    }), createGrpeHabilitation)

router.put('/edit/:id',
    //token({ required: true }),
    body({
        libelle: {
            type: String,
            required: true
        },
        listhabilitation: [],

    }), updateGrpeHabilitation)

router.get('/liste',
    //token({ required: true }),
    listHabilitation)

router.get('/show/all',
    //token({ required: true }),
    getListeGrpeHabilitation)

router.get('/show/:id',
    //token({ required: true }),
    getDetailsGrpeHabilitation)

router.delete('/remove/:id',
    //token({ required: true }),
    deleteGrpeHabilitation)

export default router;