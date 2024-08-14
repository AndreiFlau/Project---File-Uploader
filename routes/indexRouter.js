const { Router } = require("express");
const { getFoldersQuery } = require("../db/queries");
const indexRouter = Router();

indexRouter.get("/", async (req, res) => {
  const folders = await getFoldersQuery(req.user.id);
  res.render("index", { user: req.user, folders: folders });
});

module.exports = indexRouter;
