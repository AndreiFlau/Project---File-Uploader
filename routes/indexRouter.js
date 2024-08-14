const { Router } = require("express");
const { getFilesQuery } = require("../db/queries");
const indexRouter = Router();

indexRouter.get("/", async (req, res) => {
  const files = await getFilesQuery(req.user.id);
  res.render("index", { user: req.user, files: files });
});

module.exports = indexRouter;
