const { Router } = require("express");
const { registerGet, registerPost } = require("../controllers/registerController");
const registerRouter = Router();

registerRouter.get("/", registerGet);
registerRouter.post("/", registerPost);

module.exports = registerRouter;
