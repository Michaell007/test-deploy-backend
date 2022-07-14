import { Sequelize, DataTypes } from "sequelize";
import dbAuth from "../../helpers/databaseAuth";
import Article from "../article";
import Showroom from "../showroom";

const Stock = dbAuth.define('Stock', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    quantite: {
        type: DataTypes.INTEGER,
        allowNull: true

    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

Stock.belongsTo(Showroom, {  onDelete: 'CASCADE' });
Showroom.hasMany(Stock, { foreignKey: 'ShowroomId' });

Stock.belongsTo(Article, {  onDelete: 'CASCADE' });
Article.hasMany(Stock, { foreignKey: 'ArticleId' });




Stock.prototype.view = function() {
    return {
        id: this.id,
        quantite: this.quantite,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

export default Stock;