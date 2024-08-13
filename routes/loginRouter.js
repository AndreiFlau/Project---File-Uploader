const { Router } = require("express");
const passport = require("passport");
const loginRouter = Router();

loginRouter.get("/", (req, res) => {
  res.render("login", { user: req.user, errors: req.flash("error") });
});

loginRouter.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

module.exports = loginRouter;
