const { Router } = require("express");
const { getFileQuery } = require("../db/queries");
const fileInfoRouter = Router();

fileInfoRouter.get("/", async (req, res) => {
  const file = await getFileQuery(req.user.id, req.params.id);
  res.render("fileinfo", { user: req.user, file: file, filesize: "1TB" });
});

module.exports = fileInfoRouter;
