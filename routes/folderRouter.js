import { Router } from "express";
import { getFolderForm } from "../controllers/folderController.js";

const folderRouter = Router();

folderRouter.get("/create", getFolderForm);

export { folderRouter };
