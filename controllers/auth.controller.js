const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { expressjwt: expressJwt } = require("express-jwt");

const signin = async function (req, res, next) {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user || !user.authenticate(req.body.password)) {
            return res.status(401).json({
                message: "Email or password is wrong"
            })
        }

        // token and cookie expires after one day
        let token = jwt.sign({ _id: user._id }, config.jwtSecret, { expiresIn: "26h" });
        res.cookie("token", token, { maxAge: 1000 * 60 * 60 * 24 });

        res.status(200).json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        res.status(401).json({
            error: "Could not sign in"
        });
    }
}
const signout = async function (req, res, next) {
    res.clearCookie("token");
    res.status(200).json({
        message: "Successfully signed out"
    });
}

const authenticate = expressJwt({ secret: config.jwtSecret, algorithms: ["HS256"] });

const verify = function (req, res, next) {
    try {
        let authorized = req.profile && req.auth
            && req.profile._id == req.auth._id;
        if (!authorized) {
            return res.status(403).json({
                error: "User is not authorized"
            });
        }
        next();
    } catch (error) {

    }
}

module.exports = { signin, signout, authenticate, verify };