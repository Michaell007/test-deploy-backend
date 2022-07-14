import { Router } from 'express';
import { middleware as body } from 'bodymen';
import {
    addProformaEnAttente,
    addProformaShowroom,
    getDetailsProforma,
    getListProforma,
    getDirectionProforma,
    getShowroomProforma,
    deleteProforma,
    getProformaEnCours,
    getProformaRejete,
    getProformaTerminer,
    updatePoforma,
    getProformaDGFalse,
    getProformaDGTrue,
    validateDG,
    getProformaShowroomDGTrue,
    getProformaShowroomDGFalse,
    getProformaShowroomTerminer,
    getProformaShowroomRejete,
    getProformaShowroomEnCours
} from "./controllers";
import {DataTypes} from "sequelize";
// import {token} from "../../services/passport";

const router = new Router();

//Direction
router.post('/direction/add',
    //token({ required: true, admin_gg: true, habilitation: "ADD_BONCOMMANDE"}),
    body({
        DirectionId: {
            type: Number,
            require: true
        },
        detailsSell: [{}],
        etat: "",
        ClientId: {
            type: Number,
            require: false
        },
        exonere: {
            type: Boolean
        },
        remiseFixe: {
            type: DataTypes.FLOAT,
            require: false
        },
        tvaTotal: {
            type: DataTypes.FLOAT,
            require: false
        },
        adresseFacturation: {
            type: String,
            require: false
        },
        adresseLivraison: {
            type: String,
            require: false
        }
    }), addProformaEnAttente)


router.get('/direction/dg/false',
    //token({ required: true}),
    getProformaDGFalse)

router.get('/direction/dg/true',
    //token({ required: true}),
    getProformaDGTrue)

router.get('/direction/rejete',
    //token({ required: true}),
    getProformaRejete)

router.get('/direction/enCours',
    //token({ required: true}),
    getProformaEnCours)

router.get('/direction/termine',
    //token({ required: true}),
    getProformaTerminer)

router.get('/direction/:id',
    //token({ required: true}),
    getDirectionProforma)

//************************************************************************

//Showroom

router.post('/showroom/add',
    //token({ required: true, admin_gg: true, habilitation: "ADD_BONCOMMANDE"}),
    body({
        ShowroomId: {
            type: Number,
            require: true
        },
        detailsSell: [{}],
        etat: "",
        ClientId: {
            type: Number,
            require: false
        },
        exonere: {
            type: Boolean
        },
        remiseFixe: {
            type: DataTypes.FLOAT,
            require: false
        },
        tvaTotal: {
            type: DataTypes.FLOAT,
            require: false
        },
        adresseFacturation: {
            type: String,
            require: false
        },
        adresseLivraison: {
            type: String,
            require: false
        }
    }), addProformaShowroom)

router.get('/showroom/dg/false',
    //token({ required: true}),
    getProformaShowroomDGFalse)

router.get('/showroom/dg/true',
    //token({ required: true}),
    getProformaShowroomDGTrue)

router.get('/showroom/rejete',
    //token({ required: true}),
    getProformaShowroomRejete)

router.get('/showroom/enCours',
    //token({ required: true}),
    getProformaShowroomEnCours)

router.get('/showroom/termine',
    //token({ required: true}),
    getProformaShowroomTerminer)

router.get('/showroom/:id',
    //token({ required: true}),
    getShowroomProforma)

//************************************************************************

router.put('/validate/dg/:id',
    //token({ required: true, admin_gg: true, habilitation: "ADD_BONCOMMANDE"}),
    body({
        etat: "",
        detailsSell: [{}],
        remiseFixe: {
            type: DataTypes.FLOAT,
            require: false
        },
        tvaTotal: {
            type: DataTypes.FLOAT,
            require: false
        }
    }), validateDG)

router.put('/edit/:id',
    //token({ required: true, admin_super: true }),
    body({
        detailsSell: [{}],
        etat: "",
        ClientId: {
            type: Number,
            require: false
        },
        taxeId: {
            type: Number,
            require: false
        },
        remiseFixe: {
            type: DataTypes.FLOAT,
            require: false
        },
        tvaTotal: {
            type: DataTypes.FLOAT,
            require: false
        },
        adresseFacturation: {
            type: String,
            require: false
        },
        adresseLivraison: {
            type: String,
            require: false
        }
    }), updatePoforma)

/**
 * Affichage
 * **/
router.get('/liste',
    //token({ required: true}),
    getListProforma)

router.get('/:id',
    //token({ required: true}),
    getDetailsProforma)

router.delete('/delete/:id',
    //token({ required: true}),
    deleteProforma)


export default router;
