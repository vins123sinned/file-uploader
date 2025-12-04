import { Router } from "express";
import {
  getAllFolders,
  getFolder,
  getFolderForm,
  getUpdateForm,
  postDeleteFolder,
  postFolderForm,
  postUpdateForm,
} from "../controllers/folderController.js";
import { checkUser } from "../utils.js";

const folderRouter = Router();

folderRouter.get("/", getAllFolders);
folderRouter.get("/create", checkUser, getFolderForm);
folderRouter.post("/create", checkUser, postFolderForm);
folderRouter.get("/update/:folderId", checkUser, getUpdateForm);
folderRouter.post("/update/:folderId", checkUser, postUpdateForm);
folderRouter.post("/delete/:folderId", checkUser, postDeleteFolder);
folderRouter.get("/:folderId", getFolder);

export { folderRouter };
