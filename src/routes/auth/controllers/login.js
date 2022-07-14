import User from "../../../models/user";
import { sign } from "../../../services/jwt";
import bcript from "bcryptjs";

export default async ({ bodymen: { body } }, res, next) => {
    try {
        // Check user by email
        const user = await User.findOne({ where: { email: body.email } });
        if (user === null) {
            return res.sendUserError('Echec de l\'authentification.');
        }

        // check password is Ok
        const passwordvalid = await bcript.compare(body.password, user.password);
        if(!passwordvalid) return res.sendUserError('Echec de l\'authentification.');

        // generate token
        const token = await sign(user.id);

        res.json({
            succes: true,
            user: user.view(),
            token: token
        })
        
    } catch (error) {
        return next(error)
    }
}