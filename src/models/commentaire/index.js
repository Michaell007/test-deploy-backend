/*
import { Sequelize, DataTypes } from "sequelize";
import dbAuth from "../../helpers/databaseAuth";
import Role from "../article";
import BonCommande from "../showroom";

const Commentaire = dbAuth.define('Commentaire', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    libelle: {
        type: DataTypes.INTEGER,
        allowNull: false

    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

Commentaire.belongsTo(BonCommande, {  onDelete: 'CASCADE' });
BonCommande.hasMany(Commentaire, { foreignKey: 'BonCommandeId' });

Commentaire.belongsTo(Role, {  onDelete: 'CASCADE' });
Role.hasMany(Commentaire, { foreignKey: 'RoleId' });




Commentaire.prototype.view = function() {
    return {
        id: this.id,
        quantite: this.quantite,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

export default Commentaire;*/
