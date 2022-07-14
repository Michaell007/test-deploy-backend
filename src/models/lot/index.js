import { Sequelize, DataTypes } from "sequelize";
import dbAuth from "../../helpers/databaseAuth";
import Article from "../article";
import DetailsBonLivraison from "../detailsBonLivraison";
import DetailsBonSortieInterne from "../detailsBonSortieInterne";
import DetailsBonReception from "../detailsBonReception";
import DetailsBonEntree from "../detailsBonEntree";

const Lot = dbAuth.define('Lot', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    libelle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantite: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    datePeremption: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

Lot.belongsTo(Article,{  onDelete: 'CASCADE' });
Article.hasMany(Lot, { foreignKey: 'ArticleId' });

DetailsBonLivraison.belongsTo(Lot,{  onDelete: 'CASCADE' });
Lot.hasMany(DetailsBonLivraison, { foreignKey: {
        name: 'LotId',
        allowNull: true
    }  });

DetailsBonSortieInterne.belongsTo(Lot,{  onDelete: 'CASCADE',  });
Lot.hasMany(DetailsBonSortieInterne, { foreignKey: {
        name: 'LotId',
        allowNull: true
    }  });

DetailsBonEntree.belongsTo(Lot,{  onDelete: 'CASCADE' });
Lot.hasMany(DetailsBonEntree, { foreignKey: {
        name: 'LotId',
        allowNull: true
    }  });

DetailsBonReception.belongsTo(Lot,{  onDelete: 'CASCADE' });
Lot.hasMany(DetailsBonReception, { foreignKey: {
        name: 'LotId',
        allowNull: true
    }  });

Lot.prototype.view = function() {
    return {
        id: this.id,
        libelle: this.libelle,
        ref: this.ref,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

export default Lot;
