import { Router } from 'express';
import { middleware as body } from 'bodymen';
import {
    updateEnCours,
    getListBonCommande,
    getDetailsBonCommande,
    getDirectionBonCommande,
    deleteBonCommande
    /*addBonCommandeEnCours*/, getListBonCommandeByAccompte
} from "./controllers";
import validateBonCommandeDG from "./controllers/validateBonCommandeDG";
import getBonCommandeRejete from "./controllers/getBonCommandeRejete";
import getBonCommandeEnCours from "./controllers/getBonCommandeEnCours";
import getBonCommandeTerminer from "./controllers/getBonCommandeTerminer";
import validateBonCommandeDAF from "./controllers/validateBonCommandeDAF";
import addBonCommandeEnAttente from "./controllers/addBonCommandeEnAttente";
import validateFinalDaf from "./controllers/validateFinalDaf";
 import {token} from "../../services/passport";

const router = new Router();

/**
 * Direction
 * **/

router.post('/direction/add',
    //token({ required: true, admin_gg: true, habilitation: "ADD_BONCOMMANDE"}),
    body({
        DirectionId: {
            type: Number,
            require: true
        },
        detailsEntries: [{}],
        etat: "",
        FournisseurId: {
            type: Number,
            require: false
        }
    }), addBonCommandeEnAttente)

/*router.put('/direction/validate/encours/:id',
    //token({ required: true, habilitation: "VALIDATION_BONCOMMANDE" }),
    body({
        libelleFournisseur: "",
        phoneFournisseur: "",
        adresseFournisseur: "",
        emailFournisseur: "",
        paysFournisseur: "",
        personne: "",
        detailsEntries: [{}],
        etat: "",
        FournisseurId: {
            type: Number,
            require: false
        }
    }), addBonCommandeEnCours)*/

router.put('/direction/validate/daf/:id',
    //token({ required: true, admin_daf: true, habilitation: "VALIDATION_BONCOMMANDE}),
    body({
        etat: "",
        commentaire: ""
    }), validateBonCommandeDAF)

router.put('/direction/validate/dg/:id',
    //token({ required: true}),
    body({
        etat: "",
        detailsEntries: [{}]
    }), validateBonCommandeDG)

router.put('/direction/validate/:id',
    //token({ required: true}),
    body({
        etat: "",
        payementMode: "",
        accompte: {
            type: Number,
            require: true
        },
        delais: {
            type: Number
        }
    }), validateFinalDaf)


router.get('/direction/rejete',
    //token({ required: true}),
    getBonCommandeRejete)

router.get('/direction/enCours',
    //token({ required: true}),
    getBonCommandeEnCours)

router.get('/direction/termine',
    //token({ required: true}),
    getBonCommandeTerminer)

router.get('/direction/:id',
    //token({ required: true}),
    getDirectionBonCommande)

router.put('/direction/encours/edit/:id',
    //token({ required: true, admin_super: true }),
    body({
        detailsEntries: [{}],
        etat: ""
    }), updateEnCours)

/**
 * Affichage
 * **/
router.get('/liste',
    //token({ required: true}),
    getListBonCommande)

router.get('/accompte',
    //token({ required: true}),
    getListBonCommandeByAccompte)

/*router.get('/:reference',
    //token({ required: true}),
     validateBonCommandeShowroom)*/

router.get('/:id',
    //token({ required: true}),
    getDetailsBonCommande)

router.delete('/delete/:id',
    //token({ required: true}),
    deleteBonCommande)


export default router;
