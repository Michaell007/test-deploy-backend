import { Sequelize, DataTypes } from "sequelize";
import dbAuth from "../../helpers/databaseAuth";
import Article from "../article";
import Proforma from "../proforma";

const DetailsProforma = dbAuth.define('DetailsProforma', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    quantite: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    prix: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    montant: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    remise: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

DetailsProforma.belongsTo(Article, {  onDelete: 'CASCADE' });
Article.hasMany(DetailsProforma, { foreignKey: 'ArticleId' });

DetailsProforma.belongsTo(Proforma, {  onDelete: 'CASCADE' });
Proforma.hasMany(DetailsProforma, { foreignKey: 'ProformaId' });


DetailsProforma.prototype.view = function() {
    return {
        id: this.id,
        quantite: this.quantite,
        prix: this.prix,
        montant: this.montant,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

export default DetailsProforma;