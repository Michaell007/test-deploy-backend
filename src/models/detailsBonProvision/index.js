import { Sequelize, DataTypes } from "sequelize";
import dbAuth from "../../helpers/databaseAuth";
import Article from "../article";
import BonProvision from "../bonProvision";

const DetailsBonProvision = dbAuth.define('DetailsBonProvision', {

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
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

DetailsBonProvision.belongsTo(Article, {  onDelete: 'CASCADE' });
Article.hasMany(DetailsBonProvision, { foreignKey: 'ArticleId' });

DetailsBonProvision.belongsTo(BonProvision, {  onDelete: 'CASCADE' });
BonProvision.hasMany(DetailsBonProvision, { foreignKey: 'BonProvisionId' });


DetailsBonProvision.prototype.view = function() {
    return {
        id: this.id,
        quantite: this.quantite,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

export default DetailsBonProvision;