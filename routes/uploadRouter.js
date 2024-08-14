const { Router } = require("express");
const { uploadGet, uploadPost } = require("../controllers/uploadController");
const multer = require("multer");
const path = require("path");
const uploadRouter = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, name + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage: storage, limits: { fileSize: 5000000 } });

uploadRouter.get("/", uploadGet);
uploadRouter.post("/", upload.array("uploadfile"), uploadPost);

module.exports = uploadRouter;
