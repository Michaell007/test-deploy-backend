import { Router } from 'express';
import { middleware as body } from 'bodymen';
import addPays from "./controllers/addPays";
import updatePays from "./controllers/updatePays";
import getListPays from "./controllers/getListPays";
import getDetailsPays from "./controllers/getDetailsPays";
import deletePays from "./controllers/deletePays";

const router = new Router();

router.post('/add',
    //token({ required: true}),
    body({
        libelle: {

            type: String,
            trim: true,
            required: true
        },
        description: {
            type: String,
            trim: true,
            required: false
        }
    }), addPays)

router.put('/edit/:id',
    //token({ required: true, admin_super: true }),
    body({
        libelle: {

            type: String,
            trim: true,
            required: true
        },
        description: {
            type: String,
            trim: true,
            required: false
        }
    }), updatePays)

router.get('/liste',
    //token({ required: true}),
    getListPays)

router.get('/:id',
    //token({ required: true}),
    getDetailsPays)

router.delete('/delete/:id',
    //token({ required: true}),
    deletePays)

export default router;