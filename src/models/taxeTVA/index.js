import dbAuth from "../../helpers/databaseAuth";
import {DataTypes, Sequelize} from "sequelize";
import DetailsProforma from "../detailsProforma";
import DetailsFacture from "../detailsFacture";

const Taxe = dbAuth.define('Taxe', {
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
    code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    taux: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});


DetailsProforma.belongsTo(Taxe, {  onDelete: 'CASCADE' });
Taxe.hasMany(DetailsProforma, { foreignKey: 'TaxeId' });

DetailsFacture.belongsTo(Taxe, {  onDelete: 'CASCADE' });
Taxe.hasMany(DetailsFacture, { foreignKey: 'TaxeId' });

/*DetailsProforma.belongsTo(Taxe, {
    onDelete: "RESTRICT",
    foreignKey: {allowNull: true,
        name: 'TaxeId'}
})
Taxe.hasOne(DetailsProforma);

DetailsFacture.belongsTo(Taxe, {
    onDelete: "RESTRICT",
    foreignKey: {allowNull: true,
        name: 'TaxeId'}
})
Taxe.hasOne(DetailsFacture);*/

/*Taxe.belongsTo(DetailsFacture, {  onDelete: 'CASCADE' });
DetailsFacture.hasMany(Taxe, { foreignKey: 'DetailsFactureId' });*/

export default Taxe
