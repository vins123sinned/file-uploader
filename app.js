import "dotenv/config";
import path from "node:path";
import express from "express";
import session from "express-session";
import passport from "passport";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { PrismaClient } from "@prisma/client";
import { authenticationRouter } from "./routes/authenticationRouter.js";
import { fileRouter } from "./routes/fileRouter.js";
import { folderRouter } from "./routes/folderRouter.js";
import { postRouter } from "./routes/postRouter.js";
import { shareRouter } from "./routes/shareRouter.js";
import { indexRouter } from "./routes/indexRouter.js";

const app = express();

// configure views directory and set EJS as the view engine
app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");

// configure the path of static assets (css, images, etc)
const assetsPath = path.join(import.meta.dirname, "public");
app.use(express.static(assetsPath));

// session store for Passport.js
app.use(
  session({
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // ms, 1 day
    },
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, // ms, 2 minute
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  }),
);
app.use(passport.session());

// Parse the urlencoded data sent by the form's POST
app.use(express.urlencoded({ extended: false }));

// pass the user to all views
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use("/", indexRouter);
app.use("/", authenticationRouter);
app.use("/files", fileRouter);
app.use("/folders", folderRouter);
app.use("/posts", postRouter);
app.use("/share", shareRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT || 3000, (err) => {
  if (err) throw err;

  console.log(`Running on port ${PORT}`);
});
