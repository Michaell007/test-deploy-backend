const JWT = require("../../services/jwt");
const JWT_SECRET = require("../../config");
const User = require("../../models/user");



const checkUser = (req,res,next) =>  {
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];

    JWT.verify(token, JWT_SECRET, async function (err, decodedToken) {
        if (err) {
            console.log(err.message);
            res.local.user = null;
            next();
        } else {
            let user = await User.findOne({ where: { id: decodedToken.id }})
            req.userId = decodedToken.id;   // Add to req object
            res.local.user = user;
            next();
        }
    });
};

module.exports = {checkUser}
