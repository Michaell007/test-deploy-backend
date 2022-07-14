import { Sequelize, DataTypes } from "sequelize";
import CategoryArticle from "../categoryArticle";
import dbAuth from "../../helpers/databaseAuth";
import Fournisseur from "../fournisseur";

const Article = dbAuth.define('Article', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    reference: {
        type: DataTypes.STRING,
        allowNull: true
    },
    designation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
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

Article.belongsTo(CategoryArticle,{  onDelete: 'CASCADE' });
CategoryArticle.hasMany(Article, { foreignKey: 'CategoryArticleId' });

Article.belongsTo(Fournisseur,{  onDelete: 'CASCADE' });
Fournisseur.hasMany(Article, { foreignKey: 'FournisseurId' });

Article.prototype.view = function() {
    return {
        id: this.id,
        titre: this.titre,
        designation: this.designation,
        image: this.image,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

export default Article;