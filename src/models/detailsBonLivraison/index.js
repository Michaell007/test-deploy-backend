import { Sequelize, DataTypes } from "sequelize";
import dbAuth from "../../helpers/databaseAuth";
import Article from "../article";

const DetailsBonLivraison = dbAuth.define('DetailsBonLivraison', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    quantiteCmd: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantiteLivre: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    montant: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    prix: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

DetailsBonLivraison.belongsTo(Article, {  onDelete: 'CASCADE' });
Article.hasMany(DetailsBonLivraison, { foreignKey: 'ArticleId' });


DetailsBonLivraison.prototype.view = function() {
    return {
        id: this.id,
        quantite: this.quantite,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

export default DetailsBonLivraison;