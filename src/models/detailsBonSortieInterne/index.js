import { Sequelize, DataTypes } from "sequelize";
import dbAuth from "../../helpers/databaseAuth";
import Article from "../article";
// import BonSortieInterne from "../bonSortieInterne";

const DetailsBonSortieInterne = dbAuth.define('DetailsBonSortieInterne', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    quantite: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

DetailsBonSortieInterne.belongsTo(Article, {  onDelete: 'CASCADE' });
Article.hasMany(DetailsBonSortieInterne, { foreignKey: 'ArticleId' });

// DetailsBonSortieInterne.belongsTo(Lot, {  onDelete: 'CASCADE' });
// Lot.hasMany(DetailsBonSortieInterne, { foreignKey: 'ALotId' });



DetailsBonSortieInterne.prototype.view = function() {
    return {
        id: this.id,
        quantite: this.quantite,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

export default DetailsBonSortieInterne;