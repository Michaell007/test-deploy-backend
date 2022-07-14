import { Sequelize, DataTypes } from "sequelize";
import dbAuth from "../../helpers/databaseAuth";
import Article from "../article";

const DetailsBonEntree = dbAuth.define('DetailsBonEntree', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    quantiteCmd: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantiteLivre: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ecart: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

DetailsBonEntree.belongsTo(Article, {  onDelete: 'CASCADE' });
Article.hasMany(DetailsBonEntree, { foreignKey: 'ArticleId' });


DetailsBonEntree.prototype.view = function() {
    return {
        id: this.id,
        quantiteCmd: this.quantiteCmd,
        quantiteLivre: this.quantiteLivre,
        ecart: this.ecart,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

export default DetailsBonEntree;