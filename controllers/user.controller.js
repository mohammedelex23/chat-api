const errorHandler = require("../helpers/dbErrorHandler");
const User = require("./../models/user.model");

const create = async function (req, res, next) {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({
            message: "Successfully signed up"
        })
    } catch (error) {
        res.status(400).json({
            error: errorHandler.getErrorMessage(error)
        });
    }
}
const list = async function (req, res) {
    try {

        let users = await User.find({}).select('name email updatedAt createdAt');
        
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            error: errorHandler.getErrorMessage(error)
        });
    }
}
const userById = async function (req, res, next, id) {
    try {
        let user = await User.findById(id);
        if (!user)
            return res.status('400').json({
                error: "User not found"
            })
        req.profile = user;
        next();
    } catch (error) {
        res.status(400).json({
            error: "Can't retrieve user"
        })
    }
}
const read = function (req, res, next) {
    req.profile.salt = undefined;
    req.profile.password = undefined;
    return res.json(req.profile);
}
const update = async function (req, res, next) {
    try {
        let { name, email, password } = req.body;

        // basic validation : at least one update
        if (!name && !email && !password) {
            return res.status(400).json({
                message: "One of this fields is required (name,email or password)"
            })
        }

        let user = req.profile;


        user.name = name || user.name;
        user.email = email || user.email;
        user.password = password || user.password;
        user.createdAt = user.createdAt;
        user.updatedAt = Date.now();

        let updated = await user.save()

        user.salt = undefined;
        user.password = undefined;

        console.log(updated);
        res.json({
            message: "User updated successfully",
            updated
        });
    } catch (error) {
        res.status(400).json({
            error: error.message || "Something went wrong"
        })
    }
}
const remove = async function (req, res, next) {
    try {
        let user = req.profile;
        let deleted = await User.deleteOne({ _id: user._id })
        res.status(200).json({
            message: "User deleted successfully",
            deleted
        })
    } catch (error) {
        res.status(400).json({
            error: error.message || "Something went wrong"
        })
    }
}

module.exports = { create, list, userById, read, update, remove };