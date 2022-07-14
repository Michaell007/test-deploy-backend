import { Router } from 'express';
import { getListStock, getDetailsStock, deleteStock, getShowroomStock } from "./controllers";

const router = new Router();


router.get('/showroom/:id',
    //token({ required: true}),
    getShowroomStock)

router.get('/liste',
    //token({ required: true}),
    getListStock)

router.get('/:id',
    //token({ required: true}),
    getDetailsStock)

router.delete('/delete/:id',
    //token({ required: true}),
    deleteStock)

export default router;