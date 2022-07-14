import { Sequelize, DataTypes } from "sequelize";
import dbAuth from "../../helpers/databaseAuth";
import Fournisseur from "../fournisseur";

const CompteFournisseur = dbAuth.define('CompteFournisseur', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    montantRestant: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

CompteFournisseur.belongsTo(Fournisseur, {
    onDelete: "RESTRICT",
    foreignKey: {allowNull: false,
        name: 'FournisseurId'}
})
Fournisseur.hasOne(CompteFournisseur);

CompteFournisseur.prototype.view = function() {
    return {
        id: this.id,
        montantRestant: this.montantRestant,
        ref: this.ref,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

export default CompteFournisseur;