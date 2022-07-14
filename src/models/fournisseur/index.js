import { Sequelize, DataTypes } from "sequelize";
import dbAuth from "../../helpers/databaseAuth";

const Fournisseur = dbAuth.define('Fournisseur', {

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
    phone: {
        type: DataTypes.TEXT,
        allowNull: false
    }/*,
    localisation: {
        type: DataTypes.STRING,
        allowNull: true
    }*/,
    pays: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    personne: {
        type: DataTypes.STRING,
        allowNull: true
    },
    modalitePayement: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});



Fournisseur.prototype.view = function() {
    return {
        id: this.id,
        libelle: this.libelle,
        phone: this.phone,
        adresse: this.adresse,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

export default Fournisseur;
