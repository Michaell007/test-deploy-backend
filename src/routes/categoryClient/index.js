import { Router } from 'express';
import { middleware as body } from 'bodymen';
import { addCategoryClient, updateCategoryClient, getDetailsCategoryClient, getListCategoryClient, deleteCategoryClient } from "./controllers";

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
    }), addCategoryClient)

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
    }), updateCategoryClient)

router.get('/liste',
    //token({ required: true}),
    getListCategoryClient)

router.get('/:id',
    //token({ required: true}),
    getDetailsCategoryClient)

router.delete('/delete/:id',
    //token({ required: true}),
    deleteCategoryClient)

export default router;