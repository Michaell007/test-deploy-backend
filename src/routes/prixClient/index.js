import { Router } from 'express';
// import { middleware as body } from 'bodymen';
import {
    getArticlePrix
} from "./controllers";
// import {token} from "../../services/passport";

const router = new Router();

/**
 * Direction
 * **/

router.get('/article/:CategoryClientId/:ArticleId',
    //token({ required: true, admin_gg: true, habilitation: "ADD_BONCOMMANDE"}),
     getArticlePrix)

export default router;
