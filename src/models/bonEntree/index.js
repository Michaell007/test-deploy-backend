import { Sequelize, DataTypes } from "sequelize";
import dbAuth from "../../helpers/databaseAuth";
import DetailsBonEntree from "../detailsBonEntree";
import Showroom from "../showroom";
import Direction from "../direction";
import BonSortieInterne from "../bonSortieInterne";
// import BonLivraison from "../bonLivraison";

const BonEntree = dbAuth.define('BonEntree', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    refBE: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    totalEcart: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    etat: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});


BonEntree.hasMany(DetailsBonEntree, { foreignKey: 'BonEntreeId'/*, allowNull: false*/ });
DetailsBonEntree.belongsTo(BonEntree);

Showroom.hasMany(BonEntree, { foreignKey: 'ShowroomId'/*, allowNull: false*/ });
BonEntree.belongsTo(Showroom);

Direction.hasMany(BonEntree, { foreignKey: 'DirectionId'/*, allowNull: false*/ });
BonEntree.belongsTo(Direction, {  onDelete: 'CASCADE' });

BonEntree.belongsTo(BonSortieInterne, {
    onDelete: "RESTRICT",
    foreignKey: {allowNull: true,
        name: 'BonSortieInterneId'}
})
BonSortieInterne.hasOne(BonEntree);

/*BonEntree.belongsTo(BonLivraison, {
    onDelete: "RESTRICT",
    foreignKey: {allowNull: true,
        name: 'BonLivraisonId'}
})
BonLivraison.hasOne(BonEntree);*/

BonEntree.prototype.view = function() {
    return {
        id: this.id,
        montantTotal: this.montantTotal,
        etat: this.etat,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

export default BonEntree;