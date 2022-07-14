import Showroom from "../../../models/showroom";
//import User from "../../../models/user";

export default async ({params},res, next) => {
    try {
        /*const user = await User.findOne({ where: {isActive: true}})
        if (user == null){
            return res.sendUserError("Aucun utilisateur connecté!.");
        }

        const showroom = await Showroom.findOne({where: {id: user.ShowroomId}})

        let liste = await Showroom.findAll({where: {
                DirectionId: showroom.DirectionId
            }});*/

        let liste = await Showroom.findAll();

        return res.json({
            succes: true,
            details: liste
        })

    } catch (error) {
        return next(error)
    }

}