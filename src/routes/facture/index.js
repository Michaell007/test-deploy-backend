import { Router } from 'express';
import { middleware as body } from 'bodymen';
import {
    // addFactureEnAttente,
    convertFromProforma,
    convertProformaShowroom,
    getShowroomFacture,
    getListFacture,
    getDetailsFacture,
    getDirectionFacture,
    deleteFacture,
    getFactureAttente,
    getFactureShowroomAttente,
    getFactureRejete,
    getFactureTerminer,
    updateFacture,
    getFactureShowroomRejete,
    getFactureByProforma,
    getFactureShowroomTerminer
} from "./controllers";
import { DataTypes} from "sequelize";
// import {token} from "../../services/passport";

const router = new Router();

//Direction

/**
 * var detailsSell;
 * @param: quantite, prix,
 * */
router.put('/direction/convert/:id',
    //token({ required: true, admin_gg: true, habilitation: "ADD_BONCOMMANDE"}),
    body({
        etat: "",
        payementMode: "",
        delais: {
            type: Number
        },
        representant: "",
    }), convertFromProforma)

router.get('/direction/rejete',
    //token({ required: true}),
    getFactureRejete)

router.get('/direction/attente',
    //token({ required: true}),
    getFactureAttente)

router.get('/direction/termine',
    //token({ required: true}),
    getFactureTerminer)

// Les facture d'une direction a partir de l'ID
router.get('/direction/:id',
    //token({ required: true}),
    getDirectionFacture)


//************************************************************************

//Showroom
router.put('/showroom/convert/:id',
        //token({ required: true, admin_gg: true, habilitation: "ADD_BONCOMMANDE"}),
        body({
            etat: "",
            payementMode: "",
            delais: {
                type: Number
            },
            representant: "",

        }), convertProformaShowroom)

router.get('/showroom/rejete',
    //token({ required: true}),
    getFactureShowroomRejete)

router.get('/showroom/attente',
    //token({ required: true}),
    getFactureShowroomAttente)

router.get('/showroom/termine',
    //token({ required: true}),
    getFactureShowroomTerminer)

router.get('/showroom/:id',
    //token({ required: true}),
    getShowroomFacture)

//*************************************************************************



router.put('/edit/:id',
    //token({ required: true, admin_super: true }),
    body({
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
        },
        payementMode: "",
        delais: {
            type: Number
        },
        representant: ""
    }), updateFacture)

/**
 * Affichage
 * **/
router.get('/liste',
    //token({ required: true}),
    getListFacture)

router.get('/:id',
    //token({ required: true}),
    getDetailsFacture)

//Reccuperer la facture a partir de l'ID de la proforma
router.get('/:id',
    //token({ required: true}),
    getFactureByProforma)

router.delete('/delete/:id',
    //token({ required: true}),
    deleteFacture)


export default router;
