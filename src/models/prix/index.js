import dbAuth from "../../helpers/databaseAuth";
import {  DataTypes } from "sequelize";
import Article from "../article";
import CategoryClient from "../categoryClient";

const PrixClient = dbAuth.define('PrixClient', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    intitule: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});


PrixClient.belongsTo(Article, {  onDelete: 'CASCADE' });
Article.hasMany(PrixClient, { foreignKey: 'ArticleId' });

PrixClient.belongsTo(CategoryClient, {  onDelete: 'CASCADE' });
CategoryClient.hasMany(PrixClient, { foreignKey: 'CategoryClientId' });

export default PrixClient
