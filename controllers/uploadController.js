const asyncHandler = require("express-async-handler");
const path = require("path");
const cloudinary = require("../cloudinary");
const fs = require("fs").promises;
const { uploadFileQuery, getFolderIdQuery } = require("../db/queries");
require("dotenv").config();

async function uploadToCloudinary(file) {
  try {
    const result = await cloudinary.uploader.upload(file.path, { resource_type: "auto" });

    await fs.unlink(file.path);

    return result;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
}

exports.uploadGet = asyncHandler(async (req, res) => {
  const folderName = req.params.foldername;
  res.render("fileupload", { success: null, error: null, folderName: folderName });
});

exports.uploadPost = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const folderName = req.params.foldername;
  const folderId = await getFolderIdQuery(folderName, userId);
  const uploadPromises = req.files.map(async (file) => {
    const cloudinaryResult = await uploadToCloudinary(file);

    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);

    return {
      originalName: file.originalname,
      publicId: cloudinaryResult.public_id,
      url: cloudinaryResult.secure_url,
      name: name,
      format: cloudinaryResult.format,
      size: cloudinaryResult.bytes,
      resourceType: cloudinaryResult.resource_type,
    };
  });
  try {
    const files = await Promise.all(uploadPromises);
    files.forEach(async (file) => {
      await uploadFileQuery(file.name, userId, folderId, file.publicId, file.url, file.size);
    });
    const successMsg = "Your upload was a success.";
    res.render("fileupload", { success: successMsg, folderName: folderName });
  } catch (error) {
    res.render("fileupload", { error: error, folderName: folderName });
  }
  console.log(req.file);
});
