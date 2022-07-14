import { Sequelize, DataTypes } from "sequelize";
import dbAuth from "../../helpers/databaseAuth";
import Direction from "../direction";

const CompteBanque = dbAuth.define('CompteBanque', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    libelle: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    numero: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    montant: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

// Direction.hasMany(CompteBanque, { foreignKey: 'DirectionId'/*, allowNull: false*/ });
// CompteBanque.belongsTo(Direction, {  onDelete: 'CASCADE' });

CompteBanque.belongsTo(Direction, {
    onDelete: "RESTRICT",
    foreignKey: {allowNull: true,
        name: 'DirectionId'}
})
Direction.hasOne(CompteBanque);

CompteBanque.prototype.view = function() {
    return {
        id: this.id,
        montant: this.montant,
        ref: this.ref,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

export default CompteBanque;