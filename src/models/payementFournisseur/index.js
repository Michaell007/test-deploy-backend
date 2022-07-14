import { Sequelize, DataTypes } from "sequelize";
import dbAuth from "../../helpers/databaseAuth";
import Direction from "../direction";
import User from "../user";
import Fournisseur from "../fournisseur";
import BonReception from "../bonReception";
import Devise from "../devise";

const PayementFournisseur = dbAuth.define('PayementFournisseur', {

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
    valeurDevise: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    payementMode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

Direction.hasMany(PayementFournisseur, { foreignKey: 'DirectionId'/*, allowNull: false*/ });
PayementFournisseur.belongsTo(Direction, {  onDelete: 'CASCADE' });

PayementFournisseur.belongsTo(User, {  onDelete: 'CASCADE' });
User.hasMany(PayementFournisseur, { foreignKey: 'UserId' });

PayementFournisseur.belongsTo(BonReception, {  onDelete: 'CASCADE' });
BonReception.hasMany(PayementFournisseur, { foreignKey: 'BonReceptionId' });

PayementFournisseur.belongsTo(Devise, {  onDelete: 'CASCADE' });
Devise.hasMany(PayementFournisseur, { foreignKey: 'DeviseId' });

PayementFournisseur.belongsTo(Fournisseur, {  onDelete: 'CASCADE' });
Fournisseur.hasMany(PayementFournisseur, { foreignKey: 'FournisseurId' });


PayementFournisseur.prototype.view = function() {
    return {
        id: this.id,
        montant: this.montant,
        payementMode: this.payementMode,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

export default PayementFournisseur;