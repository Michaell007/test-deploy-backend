import { Sequelize, DataTypes } from "sequelize";
import dbAuth from "../../helpers/databaseAuth";
import Facture from "../facture";
import Direction from "../direction";
import Client from "../client";
import Showroom from "../showroom";
import DetailsBonLivraison from "../detailsBonLivraison";

const BonLivraison = dbAuth.define('BonLivraison', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    refBL: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    montantTotal: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    quantiteTotal: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    dateLivraison: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    adresseLivraison: {
        type: DataTypes.STRING,
        allowNull: true
    },
    expedition: {
        type: DataTypes.STRING,
        allowNull: true
    },
    commentaire: {
        type: DataTypes.STRING,
        allowNull: true
    },
    etat: {
        type: DataTypes.STRING,
        allowNull: true
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

Client.hasMany(BonLivraison, { foreignKey: 'ClientId'});
BonLivraison.belongsTo(Client);

Direction.hasMany(BonLivraison, { foreignKey: 'DirectionId' });
BonLivraison.belongsTo(Direction, {  onDelete: 'CASCADE' });

Showroom.hasMany(BonLivraison, { foreignKey: 'ShowroomId' });
BonLivraison.belongsTo(Showroom, {  onDelete: 'CASCADE' });



BonLivraison.belongsTo(Facture, {
    onDelete: "RESTRICT",
    foreignKey: {allowNull: true,
        name: 'FactureId'}
})
Facture.hasOne(BonLivraison);

/*BonLivraison.belongsToMany(Facture, { through: FactureBonLivraison });
Facture.belongsToMany(BonLivraison, { through: FactureBonLivraison });*/

DetailsBonLivraison.belongsTo(BonLivraison, {  onDelete: 'CASCADE' });
BonLivraison.hasMany(DetailsBonLivraison, { foreignKey: 'BonLivraisonId' });


BonLivraison.prototype.view = function() {
    return {
        id: this.id,
        montantTotal: this.montantTotal,
        dateLivraison: this.dateLivraison,
        expedition: this.expedition,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

export default BonLivraison;