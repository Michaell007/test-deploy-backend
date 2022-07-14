import { Sequelize, DataTypes } from "sequelize";
import dbAuth from "../../helpers/databaseAuth";
import Direction from "../direction";
import User from "../user";
import Client from "../client";
import BonLivraison from "../bonLivraison";
import Showroom from "../showroom";

const FactureAvoir = dbAuth.define('FactureAvoir', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    refFACT: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    etat: {
        type: DataTypes.STRING,
        allowNull: false
    },
    adresseFacturation: {
        type: DataTypes.STRING,
        allowNull: true
    },
    montantTotalHT: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    montantTotalTaxe: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    montantTotalRemise: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    montantTotalTTC: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    remiseTotal: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    taxeTotal: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    representant: {
        type: DataTypes.STRING,
        allowNull: true
    }/*,
    reglementJour: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    reglementCash: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    solde: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }*/,
    payementMode: {
        type: DataTypes.STRING,
        allowNull: true
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

Direction.hasMany(FactureAvoir, { foreignKey: 'DirectionId'/*, allowNull: false*/ });
FactureAvoir.belongsTo(Direction, {  onDelete: 'CASCADE' });

Showroom.hasMany(FactureAvoir, { foreignKey: 'ShowroomId'/*, allowNull: false*/ });
FactureAvoir.belongsTo(Showroom, {  onDelete: 'CASCADE' });

FactureAvoir.belongsTo(User, {  onDelete: 'CASCADE' });
User.hasMany(FactureAvoir, { foreignKey: 'UserId' });

Client.hasMany(FactureAvoir, { foreignKey: 'ClientId'/*, allowNull: false*/ });
FactureAvoir.belongsTo(Client);

FactureAvoir.belongsTo(BonLivraison, {
    onDelete: "RESTRICT",
    foreignKey: {allowNull: true,
        name: 'BonLivraisonId'}
})
BonLivraison.hasOne(FactureAvoir);

FactureAvoir.prototype.view = function() {
    return {
        id: this.id,
        montantTotal: this.montantTotal,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

export default FactureAvoir;