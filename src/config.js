import dotenv from 'dotenv'
dotenv.config()

module.exports = {
    root: '/api',
    PORT: process.env.PORT || '8000',
    SALT: 10,
    DATABASE: {
        username: /*process.env.USERNAME || */'postgres',
        password: process.env.PASSWORD,
        host: process.env.HOST,
        dialect: process.env.DIALECT,
        name: process.env.NAME
    },
    HABILITATION: [
        // USER
        "DELETE_USER",
        "UPDATE_USER",
        "VIEW_USER",
        "VIEW_ALL_USER",
        "ADD_USER",
        // ROLE
        "DELETE_ROLE",
        "UPDATE_ROLE",
        "VIEW_ROLE",
        "VIEW_ALL_ROLE",
        "ADD_ROLE",
        //BONCOMMANDE
        "DELETE_BONCOMMANDE",
        "UPDATE_BONCOMMANDE",
        "VIEW_BONCOMMANDE",
        "ADD_BONCOMMANDE",
        "VALIDATION_BONCOMMANDE",
        //BONRECEPTION
        "ADD_BONRECEPTION",
        "VALIDATION_BONRECEPTION",
        "VIEW_BONRECEPTION",
        //ARTICLE
        "ADD_ARTICLE",
        "DELETE_ARTICLE",
        "VIEW_ALL_ARTICLE",
        "UPDATE_ARTICLE",
        "VIEW_ARTICLE",
        //CATEGORY
        "ADD_CATEGORY",
        "DELETE_CATEGORY",
        "VIEW_ALL_CATEGORY",
        "UPDATE_CATEGORY",
        "VIEW_CATEGORY",
        //SHOWROOM
        "ADD_SHOWROOM",
        "DELETE_SHOWROOM",
        "VIEW_ALL_SHOWROOM",
        "UPDATE_SHOWROOM",
        "VIEW_SHOWROOM",
        //DIRECTION
        "ADD_DIRECTION",
        "DELETE_DIRECTION",
        "VIEW_ALL_DIRECTION",
        "UPDATE_DIRECTION",
        "VIEW_DIRECTION",
        //PAYS
        "ADD_PAYS",
        "DELETE_PAYS",
        "VIEW_ALL_PAYS",
        "UPDATE_PAYS",
        "VIEW_PAYS",
        //STOCK
        "DELETE_STOCK_SHOWROOM",
        "VIEW_STOCK_SHOWROOM",
        "VIEW_STOCK_SHOWROOM",
        //STOCK
        "DELETE_STOCK_DIRECTION",
        "VIEW_STOCK_DIRECTION",
        "VIEW_STOCK_DIRECTION",

    ],
    JWT_SECRET: '0a928bc597d04fa0a6e9a10a8463c1237c0d199970c24064902a987eef915b7aa66730e8f2fe4cb6b0918c91db2f3d5e5aadef33625f4b8aba694967e61d0beab1d63308142e473680d8805c59d2bd942f429a2754404f3ba47bb430604977077d56f932c70a4fdab0b64bb6d2fa4827'
};
