import { Sequelize, DataTypes } from "sequelize";
import dbAuth from "../../helpers/databaseAuth";
import Direction from "../direction";
import User from "../user";
import Client from "../client";
import Proforma from "../proforma";
import Showroom from "../showroom";

const Facture = dbAuth.define('Facture', {

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
    montantRestantClient: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    remiseTotal: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    taxeTotal: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
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
    },
    representant: {
        type: DataTypes.STRING,
        allowNull: true
    },
    payementMode: {
        type: DataTypes.STRING,
        allowNull: true
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

Direction.hasMany(Facture, { foreignKey: 'DirectionId'/*, allowNull: false*/ });
Facture.belongsTo(Direction, {  onDelete: 'CASCADE' });

Showroom.hasMany(Facture, { foreignKey: 'ShowroomId'/*, allowNull: false*/ });
Facture.belongsTo(Showroom, {  onDelete: 'CASCADE' });

Facture.belongsTo(User, {  onDelete: 'CASCADE' });
User.hasMany(Facture, { foreignKey: 'UserId' });

Facture.belongsTo(Client, {  onDelete: 'CASCADE' });
Client.hasMany(Facture, { foreignKey: 'ClientId' });

Facture.belongsTo(Proforma, {
    onDelete: "RESTRICT",
    foreignKey: {allowNull: true,
        name: 'ProformaId'}
})
Proforma.hasOne(Facture);

Facture.prototype.view = function() {
    return {
        id: this.id,
        montantTotal: this.montantTotal,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

export default Facture;