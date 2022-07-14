import { Router } from 'express';
import { middleware as body } from 'bodymen';
import { addClient, updateClient, getListClient, getDetailsClient, deleteClient } from "./controllers";
import {DataTypes} from "sequelize";
import getClientCompte from "./controllers/getClientCompte";
import getClientParametre from "./controllers/getClientParametre";

const router = new Router();

router.post('/add',
    //token({ required: true}),
    body({
        libelle: {
            type: String,
            required: true
        },
        telephone: {
            type: String,
            required: false
        },
        email: {
            type: String,
            trim: true,
            match: /^\S+@\S+\.\S+$/,
            lowercase: true,
            required: false
        },
        localisation: {
            type: String,
            require: false
        },/*
        pays: {
            type: String,
            require: false
        },*/
        CategoryClientId: {
            type: Number,
            require: true
        },
        parametreClient: {
            montantPlafond: {
                type: DataTypes.FLOAT
            },
            adresseExpedition: "",
            exenoreTaxe: {
                type: Boolean,
            },
            modalitePayement: {
                type: Number
            },
            taxeId: {
                type: Number
            },
            representant: ""
        }
    }), addClient)

router.put('/edit/:id',
    //token({ required: true, admin_super: true }),
    body({
        libelle: {
            type: String,
            required: true
        },
        telephone: {
            type: String,
            required: false
        },
        email: {
            type: String,
            trim: true,
            match: /^\S+@\S+\.\S+$/,
            lowercase: true,
            required: false
        },
        localisation: {
            type: String,
            require: false
        },/*
        pays: {
            type: String,
            require: false
        },*/
        CategoryClientId: {
            type: Number,
            require: true
        },
        parametreClient: {
            montantPlafond: {
                type: DataTypes.FLOAT
            },
            adresseExpedition: "",
            exenoreTaxe: {
                type: Boolean,
            },
            modalitePayement: {
                type: Number
            },
            taxeId: {
                type: Number
            },
            representant: ""
        }
    }), updateClient)

router.get('/liste',
    //token({ required: true}),
    getListClient)

router.get('/:id',
    //token({ required: true}),
    getDetailsClient)

router.get('/compte/:id',
    //token({ required: true}),
    getClientCompte)

router.get('/parametre/:id',
    //token({ required: true}),
    getClientParametre)

router.delete('/delete/:id',
    //token({ required: true}),
    deleteClient)

export default router;