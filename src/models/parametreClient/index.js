import { Sequelize, DataTypes } from "sequelize";
import dbAuth from "../../helpers/databaseAuth";
import Client from "../client";
import Taxe from "../taxeTVA";

const ParametreClient = dbAuth.define('ParametreClient', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    adresseExpedition: {
        type: DataTypes.STRING,
        allowNull: true
    },
    exenoreTaxe: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    modalitePayement: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    representant: {
        type: DataTypes.STRING,
        allowNull: true
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});


ParametreClient.belongsTo(Taxe,{  onDelete: 'CASCADE' });
Taxe.hasMany(ParametreClient, { foreignKey: {
        name: 'TaxeId',
        allowNull: true
    }  });

ParametreClient.belongsTo(Client, {
    onDelete: "RESTRICT",
    foreignKey: {allowNull: false,
        name: 'ClientId'}
})
Client.hasOne(ParametreClient);

/*
ParametreClient.prototype.view = function() {
    return {
        id: this.id,
        montant: this.montant,
        ref: this.ref,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};
*/

export default ParametreClient;