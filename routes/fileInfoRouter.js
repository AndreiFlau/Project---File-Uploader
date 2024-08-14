const { Router } = require("express");
const { getFileQuery } = require("../db/queries");
const fileInfoRouter = Router({ mergeParams: true });

fileInfoRouter.get("/", async (req, res) => {
  const id = Number(req.params.id);
  const file = await getFileQuery(req.user.id, id);
  res.render("fileinfo", { user: req.user, file: file, filesize: "1TB" });
});

module.exports = fileInfoRouter;
