import { Router } from 'express';
import { getListDetailsBonCommande, getDetailsDetailsBonCommande, /*deleteDetailsBonCommande*/ } from "./controllers";

const router = new Router();


router.get('/liste',
    //token({ required: true}),
    getListDetailsBonCommande)

router.get('/:id',
    //token({ required: true}),
    getDetailsDetailsBonCommande)

/*router.delete('/delete/:id',
    //token({ required: true}),
    deleteDetailsBonCommande)*/

export default router;