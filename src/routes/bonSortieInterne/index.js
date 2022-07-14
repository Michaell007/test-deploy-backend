import { Router } from 'express';
import { middleware as body } from 'bodymen';
import { addBonSortieInterne/*validateBonSortieInterne*/, updateBonSortieInterne, getListBonSortieInterne, getDetailsBonSortieInterne, /*getShowroomBonSortieInterne*/ deleteBonSortieInterne } from "./controllers";

const router = new Router();

router.put('/validate/:id',
    //token({ required: true}),
    body({
        etat: "",
        commentaire: {
            type: String,
            require: false
        },
        detailsExit: [{}]
    }), addBonSortieInterne)


router.put('/edit/:id',
    //token({ required: true, admin_super: true }),
    body({
        ShowroomId: {
            type: Number,
            require: true
        },
        detailsExit: [{}]
    }), updateBonSortieInterne)

/*router.put('validate/:id',
    //token({ required: true}),
    body({
        etat: "",
        detailsExit: [{}]
    }), validateBonSortieInterne)*/


router.get('/liste',
    //token({ required: true}),
    getListBonSortieInterne)

router.get('/:id',
    //token({ required: true}),
    getDetailsBonSortieInterne)

/*router.get('/showroom/:id',
    //token({ required: true}),
    getShowroomSortie)*/


router.delete('/delete/:id',
    //token({ required: true}),
    deleteBonSortieInterne)

export default router;