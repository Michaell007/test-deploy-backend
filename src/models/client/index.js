import { Sequelize, DataTypes } from "sequelize";
import dbAuth from "../../helpers/databaseAuth";

const Client = dbAuth.define('Client', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    libelle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telephone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    localisation: {
        type: DataTypes.STRING,
        allowNull: true
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

//Article.belongsTo(CategoryArticle,{  onDelete: 'CASCADE' });
//CategoryArticle.hasMany(Article, { foreignKey: 'CategoryArticleId' });

//Article.belongsTo(Fournisseur,{  onDelete: 'CASCADE' });
//Fournisseur.hasMany(Article, { foreignKey: 'FournisseurId' });

Client.prototype.view = function() {
    return {
        id: this.id,
        libelle: this.libelle,
        telephone: this.telephone,
        localisation: this.localisation,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

export default Client;