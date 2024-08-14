const asyncHandler = require("express-async-handler");
const path = require("path");
const { uploadFileQuery } = require("../db/queries");
require("dotenv").config();

exports.uploadGet = asyncHandler(async (req, res) => {
  res.render("fileupload", { success: null, error: null });
});

exports.uploadPost = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const files = req.files.map((file) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    return {
      originalName: file.originalname,
      filename: file.filename,
      path: file.path,
      name: name,
    };
  });
  try {
    files.forEach(async (file) => {
      await uploadFileQuery(file.name, userId);
    });
    const successMsg = "Your upload was a success.";
    res.render("fileupload", { success: successMsg });
  } catch (error) {
    res.render("fileupload", { error: error });
  }
  console.log(req.file);
});
