import {Sequelize, DataTypes} from "sequelize";
import dbAuth from "../../helpers/databaseAuth";
import Client from "../client";


const CategoryClient = dbAuth.define('CategoryClient', {

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
        type: DataTypes.STRING,
        allowNull: false
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

Client.belongsTo(CategoryClient, { foreignKey: { allowNull: true }, onDelete: 'CASCADE' });
CategoryClient.hasMany(Client, { foreignKey: 'CategoryClientId' });

CategoryClient.prototype.view = function() {
    return {
        id: this.id,
        libelle: this.libelle,
        dexcription: this.dexcription,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

export default CategoryClient;