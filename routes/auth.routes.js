const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const UserModel = require("../models/User.model");

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", async (req, res, next) => {
  const userInput = req.body;
  if (!userInput.username) {
    res.render("auth/signup", { errorMessage: "Missing username" });
    return;
  } else if (userInput.password?.length < 8) {
    res.render("auth/signup", { errorMessage: "Password to short" });
    return;
  }
  try {
    const userExist = await UserModel.findOne({ username: userInput.username });
    if (userExist) {
      res.render("auth/signup", { errorMessage: "Username already taken" });
      return;
    }
    bcryptjs.genSalt(10, async function (err, salt) {
      bcryptjs.hash(userInput.password, salt, async function (err, hash) {
        const newUser = await UserModel.create({
          username: userInput.username,
          password: hash,
        });
        req.session.user = newUser;
        res.redirect("/");
      });
    });
  } catch (err) {
    console.log({ err });
    res.render("auth/signup");
  }
});

router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

router.post("/login", async (req, res, next) => {
  const userInput = req.body;
  if (!userInput.username) {
    res.render("auth/login", { errorMessage: "Enter Username" });
    return;
  } else if (userInput.password?.length < 8) {
    res.render("auth/login", { errorMessage: "Password to short" });
    return;
  }
  const userExist = await UserModel.findOne({ username: userInput.username });
  if (!userExist) {
    res.render("auth/login", { errorMessage: "Username none existant" });
    return;
  }
  const passwordValid = await bcryptjs.compare(
    userInput.password,
    userExist.password
  );
  if (!passwordValid) {
    res.render("auth/login", { errorMessage: "wrong password" });
    return;
  }
  req.session.user = userExist;
  res.redirect("/");
});

module.exports = router;
