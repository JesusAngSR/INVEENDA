const productRepository = require("../repository/product.repository");

const Product = require("../classes/Product");

// DASHBOARD
const dashboardView = async (req, res) => {
    const products = await productRepository.findAll();
    res.render("dashboard/index", {
        user: req.session.user,
        products
    });
};

// FORM CREATE
const createView = (req, res) => {
    res.render("dashboard/create", {
        user: req.session.user
    });
};

// CREATE PRODUCT
const create = async (req, res) => {
    try {
        const productEntity =
            new Product(req.body);

        await productRepository.create(
            productEntity.toDatabase()
        );
        res.redirect("/dashboard");

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

// EDIT VIEW
const editView = async (req, res) => {
    const product = await productRepository.findById(req.params.id);
    res.render("dashboard/edit", {
        user: req.session.user,
        product
    });
};

// UPDATE
const update = async (req, res) => {
    await productRepository.update(
        req.params.id,
        req.body
    );
    res.redirect("/dashboard");
};

// DELETE
const remove = async (req, res) => {
    await productRepository.remove(req.params.id);
    res.redirect("/dashboard");
};

module.exports = {
    dashboardView,
    createView,
    create,
    editView,
    update,
    remove
};
