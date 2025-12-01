import { Router } from "express";
import {
  getFolderForm,
  postFolderForm,
} from "../controllers/folderController.js";

const folderRouter = Router();

folderRouter.get("/create", getFolderForm);
folderRouter.post("/create", postFolderForm);

export { folderRouter };
