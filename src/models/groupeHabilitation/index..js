import { Sequelize, DataTypes } from "sequelize";
import dbAuth from "../../helpers/databaseAuth";

const GroupeHabilitation = dbAuth.define('GroupeHabilitation', {
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
    //description: { type: DataTypes.TEXT },
    habilitation: { type: DataTypes.ARRAY(DataTypes.STRING) },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
});







export default GroupeHabilitation;
