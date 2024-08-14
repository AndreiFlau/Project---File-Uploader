const { Router } = require("express");
const { getFilesFromFolderQuery } = require("../db/queries");
const folderRouter = Router({ mergeParams: true });

folderRouter.get("/", async (req, res) => {
  //get folder based on user id and folder name
  console.log(req.params.foldername);
  console.log(req.params);

  const filesInFolder = await getFilesFromFolderQuery(req.params.foldername, req.user.id);
  const folderName = filesInFolder.name;
  const files = filesInFolder.files;
  res.render("folder", { files: files, folderName: folderName });
});

module.exports = folderRouter;
