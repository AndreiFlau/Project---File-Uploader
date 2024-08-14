const express = require("express");
const path = require("path");
const indexRouter = require("./routes/indexRouter");
const registerRouter = require("./routes/registerRouter");
const expressSession = require("express-session");
const flash = require("connect-flash");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");
const auth = require("./middleware/auth");
const loginRouter = require("./routes/loginRouter");
const uploadRouter = require("./routes/uploadRouter");
const fileInfoRouter = require("./routes/fileInfoRouter");
const createFolderRouter = require("./routes/createFolderRouter");
const folderRouter = require("./routes/folderRouter");
const app = express();
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set(("views", path.join(__dirname, "views")));
app.set("view engine", "ejs");
app.use(flash());
app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);
auth(app);

app.use("/", indexRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/:foldername/upload", uploadRouter);
app.use("/createfolder", createFolderRouter);
app.use("/:foldername", folderRouter);
app.use("/fileinfo/:id", fileInfoRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`listening to port: ${PORT}`));
