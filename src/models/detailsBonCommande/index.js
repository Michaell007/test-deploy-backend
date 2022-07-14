import { Sequelize, DataTypes } from "sequelize";
import dbAuth from "../../helpers/databaseAuth";
import Article from "../article";
import BonCommande from "../bonCommande";

const DetailsBonCommande = dbAuth.define('DetailsBonCommande', {

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
        type: DataTypes.INTEGER,
        allowNull: false

    },
    montant: {
        type: DataTypes.FLOAT,
        allowNull: false

    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

DetailsBonCommande.belongsTo(Article, {  onDelete: 'CASCADE' });
Article.hasMany(DetailsBonCommande, { foreignKey: 'ArticleId' });

DetailsBonCommande.belongsTo(BonCommande, {  onDelete: 'CASCADE' });
BonCommande.hasMany(DetailsBonCommande, { foreignKey: 'BonCommandeId' });


DetailsBonCommande.prototype.view = function() {
    return {
        id: this.id,
        quantite: this.quantite,
        prix: this.prix,
        montant: this.montant,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

export default DetailsBonCommande;