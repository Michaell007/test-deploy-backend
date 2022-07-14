import { Sequelize, DataTypes } from "sequelize";
import dbAuth from "../../helpers/databaseAuth";
import Article from "../article";
import Facture from "../facture";
import FactureAvoir from "../factureAvoir";

const DetailsFacture = dbAuth.define('DetailsFacture', {

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
    prix: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    montant: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    remise: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

DetailsFacture.belongsTo(Article, {  onDelete: 'CASCADE' });
Article.hasMany(DetailsFacture, { foreignKey: 'ArticleId' });

DetailsFacture.belongsTo(Facture, {  onDelete: 'CASCADE' });
Facture.hasMany(DetailsFacture, { foreignKey: 'FactureId' });

DetailsFacture.belongsTo(FactureAvoir, {  onDelete: 'CASCADE' });
FactureAvoir.hasMany(DetailsFacture, { foreignKey: 'FactureAvoirId' });

DetailsFacture.prototype.view = function() {
    return {
        id: this.id,
        quantite: this.quantite,
        prix: this.prix,
        montant: this.montant,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

export default DetailsFacture;
