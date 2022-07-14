import { Sequelize, DataTypes } from "sequelize";
import dbAuth from "../../helpers/databaseAuth";
import Role from "../roles";
import BonReception from "../bonReception";
import BonCommande from "../bonCommande";
import User_GroupeHabilitation from "../user_GroupeHabilitation";
import BonProvision from "../bonProvision";

const User = dbAuth.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
});

User.belongsTo(Role, {  onDelete: 'CASCADE' });
Role.hasMany(User, { foreignKey: 'RoleId' });


User.hasMany(BonReception, { foreignKey: 'UserId'/*, allowNull: false*/ });
BonReception.belongsTo(User);


BonCommande.belongsTo(User, {  onDelete: 'CASCADE' });
User.hasMany(BonCommande, { foreignKey: 'UserId' });

BonProvision.belongsTo(User, {  onDelete: 'CASCADE' });
User.hasMany(BonProvision, { foreignKey: 'UserId' });

User_GroupeHabilitation.belongsTo(User, {  onDelete: 'CASCADE' });
User.hasMany(User_GroupeHabilitation, { foreignKey: 'UserId' });


User.prototype.view = function() {
    return {
		id: this.id,
		username: this.username,
		email: this.email,
        image: this.image,
        createdAt: this.createdAt,
		updatedAt: this.updatedAt
	};
};

export default User;