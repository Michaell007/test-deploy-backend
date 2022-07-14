import { Sequelize, DataTypes } from "sequelize";
import dbAuth from "../../helpers/databaseAuth";
import Direction from "../direction";
import Showroom from "../showroom";

const Rapport = dbAuth.define('Rapport', {

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
    montant: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

// Direction.hasMany(Rapport, { foreignKey: 'DirectionId'/*, allowNull: false*/ });
// Rapport.belongsTo(Direction, {  onDelete: 'CASCADE' });



Rapport.belongsTo(Direction, {
    onDelete: "RESTRICT",
    foreignKey: {allowNull: true,
        name: 'DirectionId'}
})
Direction.hasOne(Rapport);

Rapport.belongsTo(Showroom, {
    onDelete: "RESTRICT",
    foreignKey: {allowNull: true,
        name: 'ShowroomId'}
})
Showroom.hasOne(Rapport);

Rapport.prototype.view = function() {
    return {
        id: this.id,
        montant: this.montant,
        ref: this.ref,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

export default Rapport;