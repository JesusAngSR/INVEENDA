const User = require("../models/User");

const create = async (userData) => {
    return await User.create(userData);
};

const findByEmail = async (email) => {
    return await User.findOne({email});
};

module.exports = {create, findByEmail};
