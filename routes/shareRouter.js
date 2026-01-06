import { Router } from "express";
import {
  getShareFolder,
  postShareFolder,
} from "../controllers/shareController.js";
import { checkUser } from "../utils.js";

const shareRouter = Router();

shareRouter.get("/:folderName", getShareFolder);
shareRouter.post("/:folderId", checkUser, postShareFolder);

export { shareRouter };
