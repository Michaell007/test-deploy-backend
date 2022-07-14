import { Sequelize, DataTypes } from "sequelize";
import dbAuth from "../../helpers/databaseAuth";
import Showroom from "../showroom";
const BonProvision = dbAuth.define('BonProvision', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    refBA: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    etat: {
        type: DataTypes.STRING,
        allowNull: false
    },
    commentaire: {
        type: DataTypes.TEXT,
        allowNull: true

    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

Showroom.hasMany(BonProvision, { foreignKey: 'ShowroomId'/*, allowNull: false*/ });
BonProvision.belongsTo(Showroom);


BonProvision.prototype.view = function() {
    return {
        id: this.id,
        commentaire: this.commentaire,
        etat: this.etat,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

export default BonProvision;