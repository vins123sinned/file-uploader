import { Router } from "express";
import { getHomepage } from "../controllers/indexController.js";

const indexRouter = Router();

indexRouter.get("/", getHomepage);

export { indexRouter };
