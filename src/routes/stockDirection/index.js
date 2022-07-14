import { Router } from 'express';
import { getDirectionStock, getListStockDirection, getDetailsStockDirection, deleteStockDirection } from "./controllers";
import getStockPrincipal from "./controllers/getStockPrincipal";

const router = new Router();


router.get('/show/:id',
    //token({ required: true}),
    getDirectionStock)

router.get('/liste',
    //token({ required: true}),
    getListStockDirection)

router.get('/:id',
    //token({ required: true}),
    getDetailsStockDirection)

router.get('/principal/:id',
    //token({ required: true}),
    getStockPrincipal)

router.delete('/delete/:id',
    //token({ required: true}),
    deleteStockDirection)

export default router;