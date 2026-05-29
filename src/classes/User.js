class User {
    #username;
    #email;
    #password;
    #role;

    constructor(data) {
        this.#username = data.username;
        this.#email = data.email;
        this.#password = data.password;
        this.#role = data.role || "customer";
    }

    getUsername() {
        return this.#username;
    }

    getEmail() {
        return this.#email;
    }

    getPassword() {
        return this.#password;
    }

    getRole() {
        return this.#role;
    }

    isAdmin() {
        return this.#role === "admin";
    }

    isCustomer() {
        return this.#role === "customer";
    }

    toDatabase() {
        return {
            username: this.#username,
            email: this.#email,
            password: this.#password,
            role: this.#role
        };
    }
}

module.exports = User;
