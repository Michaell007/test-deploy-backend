import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { HttpError } from "../error";
import { JWT_SECRET } from "../../config";
import User from "../../models/user";
import User_GroupeHabilitation from "../../models/user_GroupeHabilitation";
// import _ from "lodash";
import GroupeHabilitation from "../../models/groupeHabilitation/index.";


export const master = () =>
  passport.authenticate('master', { session: false })

export const token = ({
                          required, admin_super, admin_dg, admin_gg, habilitation
                    } = {
                        required, admin_super, admin_dg, admin_gg, habilitation
        }) => (req, res, next) =>
    passport.authenticate('token', { session: false }, async (err, user) => {
        const userhabilitation = await User_GroupeHabilitation.findAll({where: {UserId: user.id}, include: ['GroupeHabilitation']})

        if (err || (required && !user)) {
            return res.sendHttpError(new HttpError(401, 'Vous n\'êtes pas autorisé à accéder à cette application'))
        }

        if (admin_super && (user.Role.libelle !== 'ADMIN_SUPER' )) {
            return res.sendHttpError(new HttpError(401, 'Vous n\'êtes pas autorisé à accéder à ce contenu'))
        }

        for (let i = 0; i < userhabilitation.length; i++) {
            if ((admin_gg &&(user.Role.libelle !== 'ADMIN_GG')) || !(userhabilitation[i].GroupeHabilitation.habilitation.includes(habilitation))) {
                return res.sendHttpError(new HttpError(401, 'Vous n\'êtes pas autorisé à accéder à ce contenu'))
            }

            if ((admin_dg && (user.Role.libelle !== 'ADMIN_DG')) || !(userhabilitation[i].GroupeHabilitation.habilitation.includes(habilitation))) {
                return res.sendHttpError(new HttpError(401, 'Vous n\'êtes pas autorisé à accéder à ce contenu'))
            }

            break
        }

        req.logIn(user, {session: false}, (err) => {
            if (err) return res.status(401).end()
            next()
        })
    })(req, res, next)

    passport.use('token', new JwtStrategy({
        secretOrKey: JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromExtractors([
          ExtractJwt.fromUrlQueryParameter('access_token'),
          ExtractJwt.fromBodyField('access_token'),
          ExtractJwt.fromAuthHeaderWithScheme('Bearer')
        ])
    }, ({ id }, done) => {
        User.findOne({ where: { id: id }, include: ['Role'] }).then((user) => {
          done(null, user)
            return null
        }).catch(done)

    })
)
  
