import { Sequelize, DataTypes } from "sequelize";
import dbAuth from "../../helpers/databaseAuth";
import Article from "../article";

const DetailsBonReception = dbAuth.define('DetailsBonReception', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    quantiteCmd: {
        type: DataTypes.INTEGER,
        allowNull: true

    },
    quantiteLivre: {
        type: DataTypes.INTEGER,
        allowNull: true

    },
    ecart: {
        type: DataTypes.INTEGER,
        allowNull: true

    },
    resultat: {
        type: DataTypes.INTEGER,
        allowNull: true

    },
    prix: {
        type: DataTypes.FLOAT,
        allowNull: true

    },
    montant: {
        type: DataTypes.FLOAT,
        allowNull: true

    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

DetailsBonReception.belongsTo(Article, {  onDelete: 'CASCADE' });
Article.hasMany(DetailsBonReception, { foreignKey: 'ArticleId' });




DetailsBonReception.prototype.view = function() {
    return {
        id: this.id,
        quantiteCmd: this.quantiteCmd,
        quantiteLivre: this.quantiteLivre,
        montant: this.montant,
        prix: this.prix,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

export default DetailsBonReception;