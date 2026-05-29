const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");

const isAdmin = (req, res, next) => {
    if (!req.session.user || req.session.user.role !== "admin") {
        return res.redirect("/");
    }
    next();
};

router.get("/", isAdmin, productController.dashboardView);

router.get("/create", isAdmin, productController.createView);
router.post("/create", isAdmin, productController.create);

router.get("/edit/:id", isAdmin, productController.editView);
router.post("/edit/:id", isAdmin, productController.update);

router.get("/delete/:id", isAdmin, productController.remove);

module.exports = router;
