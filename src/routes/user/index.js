import { Router } from 'express';
import { middleware as body } from 'bodymen';
import { registration, changePassword, getDetailsUser, updateUser, getListUser, deleteUser } from "./controllers";

const router = new Router();



router.post('/register',
    //token({ required: true}),
    body({
        username: {
            type: String,
            trim: true,
            required: true
        },
        email: {
            type: String,
            trim: true,
            match: /^\S+@\S+\.\S+$/,
            lowercase: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        nom: {
            type: String,
            required: true
        },
        prenom: {
            type: String,
            required: true
        },
        RoleId: {
            type: Number,
            required: true

        },
        image: {
            type: String,
            required: false
        },
        GroupeHabilitation: []
    }), registration)

router.put('/password/edit/:id',
    //token({ required: true}),
    body({
        password: {
            type: String,
            required: true
        },
        newPassword: {
            type: String,
            required: true
        },
        confirmPassword: {
            type: String,
            required: true
        }
    }), changePassword)

router.get('/liste',
    //token({ required: true}),
    getListUser)


router.put('/edit/:id',
    //token({ required: true, admin_super: true }),
    body({
        username: {
            type: String,
            trim: true,
            required: true
        },
        email: {
            type: String,
            trim: true,
            match: /^\S+@\S+\.\S+$/,
            lowercase: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        nom: {
            type: String,
            required: true
        },
        prenom: {
            type: String,
            required: true
        },
        RoleId: {
            type: Number,
            required: true

        },
        image: {
            type: String,
            required: false
        },
        GroupeHabilitation: []
    }), updateUser)

router.get('/liste',
    //token({ required: true}),
    getListUser)

router.get('/:id',
    //token({ required: true}),
    getDetailsUser)

router.delete('/delete/:id',
    //token({ required: true}),
    deleteUser)

export default router;