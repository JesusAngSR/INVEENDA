const User = require("./User");

class Admin extends User {
    constructor(data) {
        super({ ...data, role: "admin" });
    }

    isAdmin() {
        return true;
    }

    canAccessDashboard() {
        return true;
    }
}

module.exports = Admin;
