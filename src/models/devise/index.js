import { Sequelize, DataTypes } from "sequelize";
import dbAuth from "../../helpers/databaseAuth";

const Devise = dbAuth.define('Devise', {

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
    valeur: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

Devise.prototype.view = function() {
    return {
        id: this.id,
        montant: this.montant,
        ref: this.ref,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

export default Devise;