import { Sequelize, DataTypes } from "sequelize";
import dbAuth from "../../helpers/databaseAuth";
import BonReception from "../bonReception";
import Fournisseur from "../fournisseur";

const BonCommande = dbAuth.define('BonCommande', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    refBDC: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    etat: {
        type: DataTypes.STRING,
        allowNull: false
    },
    montantTotal: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    validateByDG: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    validateByDAF: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    commentaire: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});


BonReception.belongsTo(BonCommande, {
    onDelete: "RESTRICT",
    foreignKey: {allowNull: true,
        name: 'BonCommandeId'}
})
BonCommande.hasOne(BonReception);

BonCommande.belongsTo(Fournisseur, {
    onDelete: "RESTRICT",
    foreignKey: {allowNull: true,
        name: 'FournisseurId'}
})
Fournisseur.hasOne(BonCommande);


BonCommande.prototype.view = function() {
    return {
        id: this.id,
        montant: this.montant,
        etat: this.etat,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

export default BonCommande;