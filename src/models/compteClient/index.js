import { Sequelize, DataTypes } from "sequelize";
import dbAuth from "../../helpers/databaseAuth";
import Client from "../client";

const CompteClient = dbAuth.define('CompteClient', {

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
    montantRestant: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    montantPlafond: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

// Direction.hasMany(compteClient, { foreignKey: 'DirectionId'/*, allowNull: false*/ });
// compteClient.belongsTo(Direction, {  onDelete: 'CASCADE' });



CompteClient.belongsTo(Client, {
    onDelete: "RESTRICT",
    foreignKey: {allowNull: false,
        name: 'ClientId'}
})
Client.hasOne(CompteClient);

CompteClient.prototype.view = function() {
    return {
        id: this.id,
        montant: this.montant,
        ref: this.ref,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

export default CompteClient;