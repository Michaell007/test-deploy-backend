import { Sequelize, DataTypes } from "sequelize";
import dbAuth from "../../helpers/databaseAuth";
import Article from "../article";
import BonReception from "../bonReception";

const DetailsDon = dbAuth.define('DetailsDon', {

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

DetailsDon.belongsTo(Article, {  onDelete: 'CASCADE' });
Article.hasMany(DetailsDon, { foreignKey: 'ArticleId' });

//DetailsDon.belongsTo(Don, {  onDelete: 'CASCADE' });
//Don.hasMany(DetailsDon, { foreignKey: 'DonId' });

DetailsDon.belongsTo(BonReception, {  onDelete: 'CASCADE' });
BonReception.hasMany(DetailsDon, { foreignKey: 'BonReceptionId' });


DetailsDon.prototype.view = function() {
    return {
        id: this.id,
        quantite: this.quantite,
        montant: this.montant,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

export default DetailsDon;