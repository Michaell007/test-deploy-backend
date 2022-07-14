import { Router } from 'express';
import { middleware as body } from 'bodymen';
import { addArticle, updateArticle, getListArticle, getListArticleByFournisseur, getDetailsArticle, deleteArticle } from "./controllers";
import getArticleByLot from "./controllers/getArticleByLot";
//import {token} from "../../services/passport";

const router = new Router();

router.post('/add',
    //token({ required: true, habilitation: "ADD_ARTICLE"}),
    body({
        designation: {
            type: String,
            trim: true,
            required: false
        },
        image: {
            type: String,
            required: false
        },
        etat: {
            type: String,
            required: false
        },
        CategoryArticleId: {
            type: Number,
            required: true
        },
        FournisseurId: {
            type: Number,
            required: true
        },
        prix: [],
        CategoryClient: []
    }), addArticle)

router.put('/edit/:id',
    //token({ required: true, admin_super: true }),
    body({
        reference: {
            type: String,
            trim: true,
            required: true
        },
        designation: {
            type: String,
            trim: true,
            required: false
        },
        etat: {
            type: String,
            required: false
        },
        image: {
            type: String,
            required: false
        },
        CategoryArticleId: {
            type: Number,
            required: true
        },
        FournisseurId: {
            type: Number,
            required: true
        },
        prix: [],
        CategoryClient: []
    }), updateArticle)

router.get('/liste',
    //token({ required: true}),
    getListArticle)

/**
 * Reccuperer les article d'un fournisseur a partir de son ID
 * @param FournisseurId
 */
router.get('/fournisseur/:id',
    //token({ required: true}),
    getListArticleByFournisseur)

/**
 * Reccuperer les lots lies a l'article a partir de l'ID de l'article
 * @param ArticleId
 */
router.get('/lot/:id',
    //token({ required: true }),
    getArticleByLot)

router.get('/:id',
    //token({ required: true}),
    getDetailsArticle)

router.delete('/delete/:id',
    //token({ required: true}),
    deleteArticle)

export default router;