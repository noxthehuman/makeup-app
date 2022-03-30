// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);
require("./config/session.config")(app);
app.use((req, res, next) => {
  console.log(req.session.cookie);
  next();
});

// default value for title local
const capitalized = require("./utils/capitalized");
const projectName = "makeup-app";

app.locals.appTitle = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const index = require("./routes/index.routes");
const product = require("./routes/product.routes");
app.use("/", index);
app.use("/products", product);

const profilePage = require("./routes/profile.routes");
app.use("/profile", profilePage);

const lookPage = require("./routes/looks.routes");
app.use("/looks", lookPage);

const auth = require("./routes/auth.routes");
app.use("/auth/", auth);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
