import { Sequelize, DataTypes } from "sequelize";
import dbAuth from "../../helpers/databaseAuth";
import Direction from "../direction";

const Showroom = dbAuth.define('Showroom', {
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
    localisation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneFixe: {
        type: DataTypes.STRING,
        allowNull: true
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
});

Showroom.belongsTo(Direction, {  onDelete: 'CASCADE' });
Direction.hasMany(Showroom, { foreignKey: 'DirectionId' });

Showroom.prototype.view = function() {
    return {
        id: this.id,
        libelle: this.libelle,
        localisation: this.localisation,
        phone: this.phone,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

export default Showroom;