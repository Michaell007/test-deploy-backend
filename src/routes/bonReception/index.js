import { Router } from 'express';
import { middleware as body } from 'bodymen';
import {
    getDetailsBonReception,
    getListBonReception,
    validateBonReception,
    getListBonReceptionEnCours,
    getListBonReceptionTermine
} from "./controllers";

const router = new Router();

router.put('/direction/add/:id',
    //token({ required: true}),
    body({
        detailsEntries: [{}],
        detailsGifts: [{}],
        etat: "",
    }), validateBonReception)

router.get('/liste',
    //token({ required: true}),
    getListBonReception)

router.get('/liste/enCours',
    //token({ required: true}),
    getListBonReceptionEnCours)

router.get('/liste/termine',
    //token({ required: true}),
    getListBonReceptionTermine)

router.get('/:id',
    //token({ required: true}),
    getDetailsBonReception)




export default router;
