import User from "../../../models/user";
import { SALT } from "../../../config";
import  bcrypt from "bcryptjs";
import _ from "lodash";
import User_GroupeHabilitation from "../../../models/user_GroupeHabilitation";
import GroupeHabilitation from "../../../models/groupeHabilitation/index.";

export default async ({ bodymen: { body }}, res, next) => {
    try {
        const usernameExist = await User.findOne({ where: { username: _.toLower(body.username)} });
        if (usernameExist !== null) {
            return res.sendUserError('Cet username est déjà utilisé.');
        }

        /*const role = await Role.findAll()
        if(role == null){
            return res.sendUserError("Veillez creer des role pour les utilisateur");
        }*/

        const emailEmail = await User.findOne({ where: { email: _.toLower(body.email) } });
        if (emailEmail !== null) {
            return res.sendUserError('Cet email est déjà utilisé.');
        }

        // hash du password
        const salt = await bcrypt.genSalt(SALT);
        const hashedPassword = await bcrypt.hash(body.password, salt);
        body.password = hashedPassword;

        // enreg. de l'utilisateur
        const user = await User.create(body);

        await Promise.all(_.forEach(body.GroupeHabilitation, (async (entity)=>  {
            const groupeHabilitation = await GroupeHabilitation.findOne({ where: {id: entity}})
            if(groupeHabilitation == null){
                return res.sendUserError("Groupe habilitation incorrect");
            }

            await User_GroupeHabilitation.create({
                UserId: user.id,
                GroupeHabilitationId: groupeHabilitation.id
            });
        })));


        // rafraichir la liste
        //const liste = await User.findAll({});

        return res.json({
            succes: true,
            results: user
        })

    } catch (error) {
        return next(error)
    }
}