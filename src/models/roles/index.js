import { Sequelize, DataTypes } from "sequelize";
import dbAuth from "../../helpers/databaseAuth";
import Showroom from "../showroom";
import Direction from "../direction";

const Role = dbAuth.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    libelle: {
        type: DataTypes.STRING,
        validate: {
            isIn: [[
                'ADMIN_USER', 
                'ADMIN_DG',  //Dir, General
                'ADMIN_CG',  //Comptable General
                'ADMIN_GG',   //Gestionnaire General
                'ADMIN_GS',   //Gestionnaire Showroom
                'ADMIN_SUPER'   //Super admin
            ]],
        }
    },
    description: { type: DataTypes.TEXT },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
});

Role.belongsTo(Showroom, {  onDelete: 'CASCADE' });
Showroom.hasMany(Role, { foreignKey: 'ShowroomId' } );

Role.belongsTo(Direction, {  onDelete: 'CASCADE' });
Direction.hasMany(Role, { foreignKey: 'DirectionId' });

export default Role;