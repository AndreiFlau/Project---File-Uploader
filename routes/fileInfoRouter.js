const { Router } = require("express");
const { getFileQuery } = require("../db/queries");
const path = require("path");
const isImage = require("../isImage");
const fileInfoRouter = Router({ mergeParams: true });

fileInfoRouter.get("/", async (req, res) => {
  const id = Number(req.params.id);
  const file = await getFileQuery(req.user.id, id);
  const sizeInBytes = file.size;
  const sizeInMB = Number(sizeInBytes) / (1024 * 1024);
  const fileext = path.extname(file.url);
  const image = isImage(fileext);
  res.render("fileinfo", {
    user: req.user,
    file: file,
    filembsize: sizeInMB.toFixed(2),
    image: image,
    folderName: req.params.foldername,
  });
});

module.exports = fileInfoRouter;
