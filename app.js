import "dotenv/config";
import path from "node:path";
import express from "express";
import session from "express-session";
import passport from "passport";
import { authenticationRouter } from "./routes/authenticationRouter.js";

const app = express();

// configure views directory and set EJS as the view engine
app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");

// configure the path of static assets (css, images, etc)
const assetsPath = path.join(import.meta.dirname, "public");
app.use(express.static(assetsPath));

// session secret for Passport.js cookies
// Make sure to add validation!
/*
app.use(session({
  cookie: {

  }
}));
app.use(passport.session());
*/

// Parse the urlencoded data sent by the form's POST
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.render("basicHomepage"));
app.use("/", authenticationRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT || 3000, (err) => {
  if (err) throw err;

  console.log(`Running on port ${PORT}`);
});
