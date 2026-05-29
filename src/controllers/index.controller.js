const productRepository = require("../repository/product.repository");

const indexView = async (req, res) => {
    const products = await productRepository.findAll();

    res.render("index", {
        user: req.session.user,
        products
    });

};

module.exports = {
    indexView
};
