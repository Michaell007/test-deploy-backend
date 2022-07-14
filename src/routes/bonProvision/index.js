import { Router } from 'express';
import {middleware as body} from "bodymen";
import {
    addBonProvision, getDetailsBonProvision,
    getListBonProvision, getShowroomBonProvision,
    deleteBonProvision,
    getBonProvisionRejete,
    getBonProvisionEnCours,
    getBonProvisionTerminer,
    // validateBonProvision,
    updateEnCours
} from "./controllers";
// import {token} from "../../services/passport";

const router = new Router();

router.post('/add',
    //token({ required: true}),
    body({
        ShowroomId: {
            type: Number,
            require: true
        },
        detailsEntries: [{}],
        etat: ""
    }), addBonProvision)

// router.put('/validate/:id',
//     //token({ required: true}),
//     body({
//         etat: ""
//     }), validateBonProvision)

router.put('/encours/edit/:id',
    //token({ required: true, admin_super: true }),
    body({
        detailsEntries: [{}],
        etat: ""
    }), updateEnCours)

router.get('/rejete',
    //token({ required: true}),
    getBonProvisionRejete)

router.get('/termine',
    //token({ required: true}),
    getBonProvisionTerminer)

router.get('/enCours',
    //token({ required: true}),
    getBonProvisionEnCours)

router.get('/liste',
    //token({ required: true}),
    getListBonProvision)

/*router.get('/:reference',
    //token({ required: true}),
    validateBonCommandeShowroom)*/

router.get('/:id',
    //token({ required: true}),
    getDetailsBonProvision)

router.get('/showroom/:id',
    //token({ required: true}),
    getShowroomBonProvision)

router.delete('/delete/:id',
    //token({ required: true}),
    deleteBonProvision)

export default router;