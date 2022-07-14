import { Sequelize, DataTypes } from "sequelize";
import dbAuth from "../../helpers/databaseAuth";
import Article from "../article";
import Direction from "../../models/direction";

const StockDirection = dbAuth.define('StockDirection', {

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

StockDirection.belongsTo(Direction, {  onDelete: 'CASCADE' });
Direction.hasMany(StockDirection, { foreignKey: 'DirectionId' });

StockDirection.belongsTo(Article, {  onDelete: 'CASCADE' });
Article.hasMany(StockDirection, { foreignKey: 'ArticleId' });




StockDirection.prototype.view = function() {
    return {
        id: this.id,
        quantite: this.quantite,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

export default StockDirection;