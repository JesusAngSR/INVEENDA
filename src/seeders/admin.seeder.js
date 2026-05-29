const bcrypt = require("bcrypt");
const User = require("../models/User");

const createAdmin = async () => {
    const adminExists = await User.findOne({email: "admin@inveenda.com"});

    if (adminExists) {
        return;
    }

    const password = await bcrypt.hash("admin123", 10);

    await User.create({
        username: "Admin",
        email: "admin@inveenda.com",
        password,
        role: "admin"
    });
};

module.exports = createAdmin;
