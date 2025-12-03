import { Router } from "express";
import {
  getAllFolders,
  getFolder,
  getFolderForm,
  postFolderForm,
} from "../controllers/folderController.js";

const folderRouter = Router();

folderRouter.get("/", getAllFolders);
folderRouter.get("/:folderId", getFolder);
folderRouter.get("/create", getFolderForm);
folderRouter.post("/create", postFolderForm);

export { folderRouter };
