const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const UserModel = require("../models/User.model");
const fileuploader = require('../config/cloudinary.config');
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", fileuploader.single("picture"), async (req, res, next) => {
  const userInput = req.body;
  console.log("userinput", userInput);
  if (!userInput.username) {
    res.render("auth/signup", { errorMessage: "Enter a username" });
    return;
  } else if (userInput.password?.length < 8) {
    res.render("auth/signup", { errorMessage: "Password is too short, you nedd at least 8 characters" });
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
          email: userInput.emailid,
          age: userInput.age,
          location: userInput.location,
          picture: req.file.path
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
    res.render("auth/login", { errorMessage: "Password to short, you need at least 8 characters" });
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
  console.log("login", userExist);
  res.redirect("/profile");
});

router.get('/logout', isLoggedIn, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .render('auth/logout', { errorMessage: err.message })
    }
    res.redirect('/')
  })
})

module.exports = router;
