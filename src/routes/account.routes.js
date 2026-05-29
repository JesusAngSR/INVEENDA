const express = require("express");
const router = express.Router();

const accountController = require("../controllers/account.controller");

const isAuth = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/auth/login");
    }
    next();
};

router.get("/", isAuth, accountController.accountView);

module.exports = router;
