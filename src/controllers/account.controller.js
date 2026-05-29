const accountView = (req, res) => {
    res.render("account", {
        user: req.session.user
    });
};

module.exports = {
    accountView
};
