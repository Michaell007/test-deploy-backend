import { Sequelize, DataTypes } from "sequelize";
import dbAuth from "../../helpers/databaseAuth";
import Direction from "../direction";
import User from "../user";
import Client from "../client";
import Showroom from "../showroom";

const Proforma = dbAuth.define('Proforma', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    ref: {
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
        allowNull: false
    },
    adresseLivraison: {
        type: DataTypes.STRING,
        allowNull: true
    },
    commentaire: {
        type: DataTypes.STRING,
        allowNull: true
    },
    accordClient: {
        type: DataTypes.BOOLEAN,
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
    delais: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    validateByDG: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

Direction.hasMany(Proforma, { foreignKey: 'DirectionId'/*, allowNull: false*/ });
Proforma.belongsTo(Direction, {  onDelete: 'CASCADE' });

Showroom.hasMany(Proforma, { foreignKey: 'ShowroomId'/*, allowNull: false*/ });
Proforma.belongsTo(Showroom, {  onDelete: 'CASCADE' });

Proforma.belongsTo(User, {  onDelete: 'CASCADE' });
User.hasMany(Proforma, { foreignKey: 'UserId' });

Proforma.belongsTo(Client, {  onDelete: 'CASCADE' });
Client.hasMany(Proforma, { foreignKey: 'ClientId' });

Proforma.prototype.view = function() {
    return {
        id: this.id,
        montantTotal: this.montantTotal,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

export default Proforma;