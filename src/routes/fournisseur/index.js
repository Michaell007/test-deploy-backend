import { Router } from 'express';
import { middleware as body } from 'bodymen';
import { addFournisseur, updateFournisseur, getListFournisseur, getDetailsFournisseur, deleteFournisseur } from "./controllers";
import getFournisseurCompte from "./controllers/getFournisseurCompte";

const router = new Router();

router.post('/add',
    //token({ required: true}),
    body({
        libelle: {
            type: String,
            required: true
        },
        email: {
            type: String,
            trim: true,
            match: /^\S+@\S+\.\S+$/,
            lowercase: true,
            required: false
        },
        phone: {
            type: String,
            require: false
        },
        pays: {
            type: String,
            require: false
        },
        personne: {
            type: String,
            require: false
        },
        modalitePayement: {
            type: Number
        }
    }), addFournisseur)

router.put('/edit/:id',
    //token({ required: true, admin_super: true }),
    body({
        libelle: {
            type: String,
            required: true
        },
        email: {
            type: String,
            trim: true,
            match: /^\S+@\S+\.\S+$/,
            lowercase: true,
            required: false
        },
        phone: {
            type: String,
            require: false
        },
        pays: {
            type: String,
            require: false
        },
        personne: {
            type: String,
            require: false
        },
        modalitePayement: {
            type: Number
        }
    }), updateFournisseur)

router.get('/liste',
    //token({ required: true}),
    getListFournisseur)

router.get('/compte/:id',
    //token({ required: true}),
    getFournisseurCompte)

router.get('/:id',
    //token({ required: true}),
    getDetailsFournisseur)

router.delete('/delete/:id',
    //token({ required: true}),
    deleteFournisseur)

export default router;