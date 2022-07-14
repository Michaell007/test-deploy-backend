import { Router } from 'express';
import {
    rapportClientImpaye,
    rapportClientTermine,
    rapportFactureImpaye,
    rapportFactureTermine
} from "./controllers";
// import {token} from "../../services/passport";

const router = new Router();

/**
 * Affichage
 * **/
router.get('/facture/client/impaye/:id',
    //token({ required: true}),
    rapportClientImpaye)

router.get('/facture/client/termine/:id',
    //token({ required: true}),
    rapportClientTermine)

router.get('/facture/implaye',
    //token({ required: true}),
    rapportFactureImpaye)

router.get('/facture/termine',
    //token({ required: true}),
    rapportFactureTermine)


export default router;
