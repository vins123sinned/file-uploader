import { Router } from "express";
import {
  getAllFolders,
  getFolder,
  getFolderForm,
  getUpdateForm,
  postFolderForm,
  postUpdateForm,
} from "../controllers/folderController.js";
import { checkUser } from "../utils.js";

const folderRouter = Router();

folderRouter.get("/", getAllFolders);
folderRouter.get("/create", checkUser, getFolderForm);
folderRouter.post("/create", checkUser, postFolderForm);
folderRouter.get("/update/:folderId", checkUser, getUpdateForm);
folderRouter.post("/update/:folderId", postUpdateForm);
folderRouter.get("/:folderId", getFolder);

export { folderRouter };
