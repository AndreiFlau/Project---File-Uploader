const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const passport = require("passport");
const { createFolderQuery } = require("../db/queries");
require("dotenv").config();

const validateFolder = [
  body("foldername").isLength({ min: 1, max: 30 }).withMessage(`Folder name must be between 1 and 30 characters long.`),
];

exports.createFolderGet = asyncHandler(async (req, res) => {
  res.render("createfolder");
});

exports.createFolderPost = [
  validateFolder,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("createfolder", {
        errors: errors.array(),
      });
    }
    try {
      const { foldername } = req.body;
      const userId = req.user.id;
      await createFolderQuery(foldername, userId);
      res.redirect("/");
    } catch (err) {
      return next(err);
    }
  }),
];
