import { Sequelize } from "sequelize";
import { DATABASE } from "../config";

export default new Sequelize(DATABASE.name, DATABASE.username, DATABASE.password, {
    host: DATABASE.host,
    dialect: DATABASE.dialect,
    logging: false
});