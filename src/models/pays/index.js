import { Sequelize, DataTypes } from "sequelize";
import dbAuth from "../../helpers/databaseAuth";
import Direction from "../direction";

const Pays = dbAuth.define('Pays', {

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
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});


Pays.prototype.view = function() {
    return {
        id: this.id,
        libelle: this.libelle,
        description: this.description,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

export default Pays;