import { Router } from 'express';
import { middleware as body } from 'bodymen';
import { addShowroom, updateShowroom, getListShowroom, getDetailsShowroom, deleteShowroom } from "./controllers";
import getDirectionShowroom from "./controllers/getDirectionShowroom";
import getShowroomCaisse from "./controllers/getShowroomCaisse";


const router = new Router();

router.post('/add',
    //token({ required: true}),
    body({
        libelle: {
            type: String,
            required: true
        },
        localisation: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        phoneFixe: {
            type: String,
            required: true
        },
        DirectionId: {
            type: Number,
            required: true
        }
    }), addShowroom)

router.put('/edit/:id',
    //token({ required: true, admin_super: true }),
    body({
        libelle: {
            type: String,
            required: true
        },
        localisation: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        phoneFixe: {
            type: String,
            required: true
        },
        DirectionId: {
            type: Number,
            required: true
        }
    }), updateShowroom)

router.get('/liste',
    //token({ required: true}),
    getListShowroom)

router.get('/:id',
    //token({ required: true}),
    getDetailsShowroom)

router.get('/direction/:id',
    //token({ required: true}),
    getDirectionShowroom)

router.get('/caisse/:id',
    //token({ required: true}),
    getShowroomCaisse)

router.delete('/delete/:id',
    //token({ required: true}),
    deleteShowroom)

export default router;