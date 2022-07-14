import { Sequelize, DataTypes } from "sequelize";
import dbAuth from "../../helpers/databaseAuth";
import Pays from "../pays";
import BonCommande from "../bonCommande";
import BonReception from "../bonReception";

const Direction = dbAuth.define('Direction', {

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
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },

    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

Direction.belongsTo(Pays, {
    onDelete: "RESTRICT",
    foreignKey: {allowNull: true,
        name: 'PaysId'}
})

Direction.hasMany(BonCommande, { foreignKey: 'DirectionId'/*, allowNull: false*/ });
BonCommande.belongsTo(Direction, {  onDelete: 'CASCADE' });

Direction.hasMany(BonReception, { foreignKey: 'DirectionId'/*, allowNull: false*/ });
BonReception.belongsTo(Direction, {  onDelete: 'CASCADE' });

Direction.prototype.view = function() {
    return {
        id: this.id,
        libelle: this.libelle,
        description: this.description,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

export default Direction;