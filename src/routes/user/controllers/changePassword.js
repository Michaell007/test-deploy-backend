import User from "../../../models/user";
import { SALT } from "../../../config";
import  bcrypt from "bcryptjs";
import bcript from "bcryptjs";

export default async ({ body, params }, res, next) => {
    try {
        const user = await User.findOne({ where: { id: params.id }});

        const passwordvalid = await bcript.compare(body.password, user.password);
        if(!passwordvalid) return res.sendUserError('Mot de passe incorrect!');


        if(body.newPassword !== body.confirmPassword){
            return res.sendUserError('les mots de passe ne concordent pas!')
        }
        const salt = await bcrypt.genSalt(SALT);
        const hashedPassword = await bcrypt.hash(body.confirmPassword, salt);

        await user.update({
            password: hashedPassword
        })


        return res.json({
            succes: true,
            results: user
        })

        // return res.json({
        //     success: true,
        //     user: user.view()
        // })
    } catch (error) {
        return next(error)
    }
}