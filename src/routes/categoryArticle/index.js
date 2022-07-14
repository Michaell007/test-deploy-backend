import { Router } from 'express';
import { middleware as body } from 'bodymen';
import { addCategoryArticle, updateCategoryArticle, getDetailsCategoryArticle, getListCategoryArticle, deleteCategoryArticle } from "./controllers";

const router = new Router();

router.post('/add',
    //token({ required: true}),
    body({
        titre: {

            type: String,
            trim: true,
            required: true
        },
        designation: {
            type: String,
            trim: true,
            required: false
        }
    }), addCategoryArticle)

router.put('/edit/:id',
    //token({ required: true, admin_super: true }),
    body({
        titre: {

            type: String,
            trim: true,
            required: true
        },
        designation: {
            type: String,
            trim: true,
            required: false
        }
    }), updateCategoryArticle)

router.get('/liste',
    //token({ required: true}),
    getListCategoryArticle)

router.get('/:id',
    //token({ required: true}),
    getDetailsCategoryArticle)

router.delete('/delete/:id',
    //token({ required: true}),
    deleteCategoryArticle)

export default router;