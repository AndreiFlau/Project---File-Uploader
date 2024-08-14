const { Router } = require("express");
const { getFileQuery } = require("../db/queries");
const { createFolderGet, createFolderPost } = require("../controllers/folderController");
const createFolderRouter = Router();

createFolderRouter.get("/", createFolderGet);
createFolderRouter.post("/", createFolderPost);

module.exports = createFolderRouter;
