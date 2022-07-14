const JWT = require("../../services/jwt");
const JWT_SECRET = require("../../config");
const User = require("../../models/user");

module.exports = function (req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];

    // decode token
    if (token) {

        //var hash = JWT_SECRET.secret.replace(/^\$2y(.+)$/i, '\$2a$1');
        // verifies secret
        JWT.verify(token, JWT_SECRET, async function (err, decoded) {
            if (err) {
                return res.status(403).json({message: 'Invalid token'});
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                // const user = await User.findOne({where: {id: req.decoded.id}})
                // req.currentUser = user;
                // return console.log(req.currentUser)
                User.getUserInformationById(req.decoded.id, function (err, user) {
                    req.currentUser = user;
                    next();
                });
            }
        });
    } else {
        // if there is no token

        return res.status(403).json({
            message: 'Invalid token'
        });
    }
};