const User = require("./User");

class Customer extends User {
    constructor(data) {
        super({ ...data, role: "customer" });
    }

    isCustomer() {
        return true;
    }

    canBuy() {
        return true;
    }
}

module.exports = Customer;
