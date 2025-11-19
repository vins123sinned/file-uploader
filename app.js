import "dotenv/config";
import express from "express";

const app = express();

app.get("/", (req, res) => res.send("Who goes there?"));

// configure views directory and set EJS as the view engine
app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");

// configure the path of static assets (css, images, etc)
const assetsPath = path.join(import.meta.dirname, "public");
app.use(express.static(assetsPath));

const PORT = process.env.PORT || 3000;
app.listen(PORT || 3000, (err) => {
  if (err) throw err;

  console.log(`Running on port ${PORT}`)
});

