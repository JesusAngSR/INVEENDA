const userRepository = require("../repository/user.repository");
const authService = require("../services/auth.service");

const Admin = require("../classes/Admin");
const Customer = require("../classes/Customer");

const loginView = (req, res) => {
    res.render("auth/login");
};

const registerView = (req, res) => {
    res.render("auth/register");
};

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await userRepository.findByEmail(email);

        if (existingUser) {
            return res.send("Usuario ya existe");
        }

        const hashedPassword = await authService.hashPassword(password);

        const userEntity = new Customer({
            username,
            email,
            password: hashedPassword
        });

        await userRepository.create(userEntity.toDatabase());

        res.redirect("/auth/login");

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).render("auth/login", {
                error: "Completa todos los campos"
            });
        }

        const user = await userRepository.findByEmail(email);

        if (!user) {
            return res.status(401).render("auth/login", {
                error: "El usuario no existe"
            });
        }

        const validPassword = await authService.comparePassword(
            password,
            user.password
        );

        if (!validPassword) {
            return res.status(401).render("auth/login", {
                error: "Contraseña incorrecta"
            });
        }

        // 🔥 IMPORTANTE: usar datos reales de Mongo directamente
        const role = user.role || "customer";

        let sessionUser;

        if (role === "admin") {
            sessionUser = new Admin(user);
        } else {
            sessionUser = new Customer(user);
        }

        req.session.regenerate((err) => {
            if (err) {
                console.log(err);
                return res.redirect("/auth/login");
            }

            // 🔥 FIX CLAVE: usar datos directos + fallback seguro
            req.session.user = {
                username: user.username || sessionUser.getUsername(),
                email: user.email,
                role: role
            };

            req.session.save(() => {
                res.redirect("/");
            });
        });

    } catch (error) {
        console.log(error);
        res.status(500).render("auth/login", {
            error: "Error interno del servidor"
        });
    }
};

const logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
};

module.exports = {
    loginView,
    registerView,
    register,
    login,
    logout
};
