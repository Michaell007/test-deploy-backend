import { Sequelize, DataTypes } from "sequelize";
import dbAuth from "../../helpers/databaseAuth";
import DetailsBonReception from "../detailsBonReception";
import Fournisseur from "../fournisseur";

const BonReception = dbAuth.define('BonReception', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    refBR: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    montantTotal: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    montantTotalResultat: {
        type: DataTypes.FLOAT,
        allowNull: true
    }/*,
    payementMode: {
        type: DataTypes.STRING,
        allowNull: true
    }*/,
    accompte: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    etat: {
        type: DataTypes.STRING,
        allowNull: false
    },
    reglementJour: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});


BonReception.hasMany(DetailsBonReception, { foreignKey: 'BonReceptionId'/*, allowNull: false*/ });
DetailsBonReception.belongsTo(BonReception);


BonReception.belongsTo(Fournisseur, {
    onDelete: "RESTRICT",
    foreignKey: {allowNull: true,
        name: 'FournisseurId'}
})
Fournisseur.hasOne(BonReception);

BonReception.prototype.view = function() {
    return {
        id: this.id,
        montantTotal: this.montantTotal,
        etat: this.etat,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

export default BonReception;