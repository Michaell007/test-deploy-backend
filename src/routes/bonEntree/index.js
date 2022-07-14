import { Router } from 'express';
import { middleware as body } from 'bodymen';
import {
    getDetailsBonEntree,
    getListBonEntree,
    validateBonEntreeShowroom,
    getListBonEntreeEnCours,
    getListBonEntreeTermine
} from "./controllers";

const router = new Router();

router.put('/add/:id',
    //token({ required: true}),
    body({
        detailsEntries: [{}],
        etat: ""
    }), validateBonEntreeShowroom)

router.get('/liste',
    //token({ required: true}),
    getListBonEntree)

router.get('/liste/enCours',
    //token({ required: true}),
    getListBonEntreeEnCours)

router.get('/liste/termine',
    //token({ required: true}),
    getListBonEntreeTermine)

router.get('/:id',
    //token({ required: true}),
    getDetailsBonEntree)

export default router;
