import "dotenv/config";
import express from "express";

const app = express();

app.get("/", (req, res) => res.send("Who goes there?"));

const PORT = process.env.PORT || 3000;
app.listen(PORT || 3000, (err) => {
  if (err) throw err;

  console.log(`Running on port ${PORT}`)
});

