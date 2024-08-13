const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const { registerUserQuery } = require("../db/queries");
require("dotenv").config();

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";

const validateUser = [
  body("username")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 20 })
    .withMessage(`First name ${lengthErr}`),
  body("email").trim().isEmail().withMessage("Must be a proper email."),
  body("password").trim().isLength({ min: 6, max: 30 }).withMessage("Password must be have at least 6 characters."),
  body("confirmpassword")
    .trim()
    .isLength({ min: 6, max: 30 })
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords don't match."),
];

exports.registerGet = asyncHandler(async (req, res) => {
  res.render("register");
});

exports.registerPost = [
  validateUser,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("register", {
        errors: errors.array(),
      });
    }
    try {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) {
          console.log(err.message);
        }
        const { email, username } = req.body;
        await registerUserQuery(email, username, hashedPassword);
      });
      res.redirect("/");
    } catch (err) {
      return next(err);
    }
  }),
];
