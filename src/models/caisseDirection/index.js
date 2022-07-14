import { Sequelize, DataTypes } from "sequelize";
import dbAuth from "../../helpers/databaseAuth";
import Direction from "../direction";
import Showroom from "../showroom";

const CaisseDirection = dbAuth.define('CaisseDirection', {

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
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

// Direction.hasMany(CaisseDirection, { foreignKey: 'DirectionId'/*, allowNull: false*/ });
// CaisseDirection.belongsTo(Direction, {  onDelete: 'CASCADE' });



CaisseDirection.belongsTo(Direction, {
    onDelete: "RESTRICT",
    foreignKey: {allowNull: true,
        name: 'DirectionId'}
})
Direction.hasOne(CaisseDirection);

CaisseDirection.belongsTo(Showroom, {
    onDelete: "RESTRICT",
    foreignKey: {allowNull: true,
        name: 'ShowroomId'}
})
Showroom.hasOne(CaisseDirection);

CaisseDirection.prototype.view = function() {
    return {
        id: this.id,
        montant: this.montant,
        ref: this.ref,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

export default CaisseDirection;