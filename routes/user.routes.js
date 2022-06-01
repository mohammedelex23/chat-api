const express = require("express");
const userCtrl = require("../controllers/user.controller");
const authCtrl = require("../controllers/auth.controller");

const router = express.Router();

router.route("/api/users")
    .get(userCtrl.list)
    .post(userCtrl.create)

router.route("/api/users/:userId")
    .get(authCtrl.authenticate, authCtrl.verify,userCtrl.read)
    .put(authCtrl.authenticate, userCtrl.update)
    .delete(authCtrl.authenticate, userCtrl.remove)

router.param("userId", userCtrl.userById);

module.exports = router;