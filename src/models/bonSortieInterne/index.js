import { Sequelize, DataTypes } from "sequelize";
import dbAuth from "../../helpers/databaseAuth";
import Showroom from "../showroom";
import Direction from "../direction";
import BonProvision from "../bonProvision";
import DetailsBonSortieInterne from "../detailsBonSortieInterne";

const BonSortieInterne = dbAuth.define('BonSortieInterne', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    refBSI: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    etat: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

Showroom.hasMany(BonSortieInterne, { foreignKey: 'ShowroomId'/*, allowNull: false*/ });
BonSortieInterne.belongsTo(Showroom, {  onDelete: 'CASCADE' });

Direction.hasMany(BonSortieInterne, { foreignKey: 'DirectionId'/*, allowNull: false*/ });
BonSortieInterne.belongsTo(Direction, {  onDelete: 'CASCADE' });

BonSortieInterne.belongsTo(BonProvision, {
    onDelete: "RESTRICT",
    foreignKey: {allowNull: true,
        name: 'BonProvisionId'}
})
BonProvision.hasOne(BonSortieInterne);

DetailsBonSortieInterne.belongsTo(BonSortieInterne, {  onDelete: 'CASCADE' });
BonSortieInterne.hasMany(DetailsBonSortieInterne, { foreignKey: 'BonSortieInterneId' });


BonSortieInterne.prototype.view = function() {
    return {
        id: this.id,
        refBSI: this.refBSI,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

export default BonSortieInterne;