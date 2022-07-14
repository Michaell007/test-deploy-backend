import User from "../../../models/user";
import _ from "lodash";

export default async ({ body, params }, res, next) => {

    try {
        // check user
        const user = await User.findOne({ where: { id: params.id }});
        if (user == null) {
            return res.sendUserError('Utilisateur incorrect.');
        }


        const usernameExist = await User.findOne({ where: { username: body.username } });
        if ((usernameExist != null) && (user.username !== body.username )) {
            return res.sendUserError('Username existe deja.');
        }

        const emailExist = await User.findOne({ where: { email: body.email } });
        if ((emailExist != null) && (user.email !== body.email )) {
            return res.sendUserError('Email existe deja.');
        }


        // control data body and update
        const payload = _.pick(body, ['username', 'email', "nom", "prenom", "image", 'RoleId', 'GroupeHabilitation']);
        await user.update(payload);

        // reload data
        // let newData = await User.findOne({ where: { id: params.id }/*, attributes: {exclude: ['password']}*/});

        // return res.json({
        //     succes: true,
        //     results: newData
        // })
        // rafraichir la liste
        const liste = await User.findAll({});

        return res.json({
            succes: true,
            results: liste
        })

    } catch (error) {
        next(error)
    }
}