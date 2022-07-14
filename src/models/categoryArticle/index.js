import {Sequelize, DataTypes} from "sequelize";
import dbAuth from "../../helpers/databaseAuth";

const CategoryArticle = dbAuth.define('CategoryArticle', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    titre: {

        type: DataTypes.STRING,
        allowNull: false
    },
    designation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

//Article.belongsTo(CategoryArticle, { foreignKey: { allowNull: true }, onDelete: 'CASCADE' });
//CategoryArticle.hasMany(Article, { foreignKey: 'CatArtId' });

CategoryArticle.prototype.view = function() {
    return {
        id: this.id,
        titre: this.titre,

        designation: this.designation,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

export default CategoryArticle;