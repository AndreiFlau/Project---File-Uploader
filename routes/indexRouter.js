const { Router } = require("express");
const { getFoldersQuery } = require("../db/queries");
const indexRouter = Router();

indexRouter.get("/", async (req, res) => {
  const folders = req.user && req.user.id ? await getFoldersQuery(req.user.id) : [];
  res.render("index", { user: req.user, folders: folders });
});

indexRouter.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = indexRouter;
