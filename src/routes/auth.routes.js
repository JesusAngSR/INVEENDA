const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.get("/login", authController.loginView);

router.get("/register", authController.registerView);

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/logout", authController.logout);

module.exports = router;
