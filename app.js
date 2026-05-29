const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

require("dotenv").config();
const session = require("express-session");
const connectDB = require("./src/configs/database.config");
const createAdmin = require("./src/seeders/admin.seeder");

const indexRouter = require("./src/routes/index.routes");
const authRouter = require("./src/routes/auth.routes");
const accountRouter = require("./src/routes/account.routes");
const dashboardRouter = require("./src/routes/dashboard.routes");

connectDB();
createAdmin();
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET ?? "secret",
  resave: false,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/account", accountRouter);
app.use("/dashboard", dashboardRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(
    err.status || 500
  );
  res.render("error");
});

module.exports = app;
