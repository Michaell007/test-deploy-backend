import { Sequelize, DataTypes } from "sequelize";
import dbAuth from "../../helpers/databaseAuth";
import Direction from "../direction";
import User from "../user";
import Client from "../client";
import Facture from "../facture";
import Showroom from "../showroom";

const Payement = dbAuth.define('Payement', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    montant: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    payementMode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

Direction.hasMany(Payement, { foreignKey: 'DirectionId'/*, allowNull: false*/ });
Payement.belongsTo(Direction, {  onDelete: 'CASCADE' });

Showroom.hasMany(Payement, { foreignKey: 'ShowroomId'/*, allowNull: false*/ });
Payement.belongsTo(Showroom, {  onDelete: 'CASCADE' });

Payement.belongsTo(User, {  onDelete: 'CASCADE' });
User.hasMany(Payement, { foreignKey: 'UserId' });

Payement.belongsTo(Facture, {  onDelete: 'CASCADE' });
Facture.hasMany(Payement, { foreignKey: 'FactureId' });

Payement.belongsTo(Client, {  onDelete: 'CASCADE' });
Client.hasMany(Payement, { foreignKey: 'ClientId' });




Payement.prototype.view = function() {
    return {
        id: this.id,
        montant: this.montant,
        payementMode: this.payementMode,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

export default Payement;