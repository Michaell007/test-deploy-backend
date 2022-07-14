import GroupeHabilitation from "../groupeHabilitation/index.";
import dbAuth from "../../helpers/databaseAuth";

const User_GroupeHabilitation = dbAuth.define('User_GroupeHabilitation', {

});


User_GroupeHabilitation.belongsTo(GroupeHabilitation, {  onDelete: 'CASCADE' });
GroupeHabilitation.hasMany(User_GroupeHabilitation, { foreignKey: 'GroupeHabilitationId' });

export default User_GroupeHabilitation
