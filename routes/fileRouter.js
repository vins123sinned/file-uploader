import { Router } from "express";
import { getFileForm } from "../controllers/fileController.js";

const fileRouter = Router();

fileRouter.get("/upload", getFileForm);

export { fileRouter };
