import { Router } from "express";
import { getHomepage } from "../controllers/indexController.js";

const indexRouter = Router();

indexRouter.get("/", getHomepage);
indexRouter.get("/{*splat}", (req, res) => {
  res.status(404).render("layout", {
    title: "Error 404",
    path: "partials/error.ejs",
    error: {
      message: "Error 404: The page you are looking for does not exist",
    },
  });
});

export { indexRouter };
