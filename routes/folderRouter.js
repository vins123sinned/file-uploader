import { Router } from "express";
import {
  getAllFolders,
  getFolder,
  getFolderForm,
  getEditForm,
  postDeleteFolder,
  postFolderForm,
  postEditForm,
  postShareFolder,
} from "../controllers/folderController.js";
import { checkUser } from "../utils.js";

const folderRouter = Router();

folderRouter.get("/", getAllFolders);
folderRouter.get("/create", checkUser, getFolderForm);
folderRouter.post("/create", checkUser, postFolderForm);
folderRouter.get("/edit/:folderId", checkUser, getEditForm);
folderRouter.post("/edit/:folderId", checkUser, postEditForm);
folderRouter.post("/delete/:folderId", checkUser, postDeleteFolder);
folderRouter.post("/share/:folderId", checkUser, postShareFolder);
folderRouter.get("/:folderId", getFolder);

export { folderRouter };
