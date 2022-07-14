import { Router } from 'express';
import { middleware as body } from 'bodymen';
import {addTaxe, updateTaxe, getListTaxeTVA, getDetailsTaxe, deleteTaxe, getListTaxe} from "./controllers";

const router = new Router();

router.post('/add',
    //token({ required: true}),
    body({
        libelle: {
            type: String,
            required: true
        },
        code: {
            type: String,
            require: false
        },
        taux: {
            type: Number,
            require: true
        }
    }), addTaxe)

router.put('/edit/:id',
    //token({ required: true, admin_super: true }),
    body({
        libelle: {
            type: String,
            required: true
        },
        code: {
            type: String,
            require: false
        },
        taux: {
            type: Number,
            require: true
        }
    }), updateTaxe)

router.get('/liste',
    //token({ required: true}),
    getListTaxe)

router.get('/liste/tva',
    //token({ required: true}),
    getListTaxeTVA)

router.get('/:id',
    //token({ required: true}),
    getDetailsTaxe)

router.delete('/delete/:id',
    //token({ required: true}),
    deleteTaxe)

export default router;