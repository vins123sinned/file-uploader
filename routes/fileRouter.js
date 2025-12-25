import { Router } from "express";
import {
  getAllFiles,
  getFile,
  postDeleteFile,
  postUploadFiles,
} from "../controllers/fileController.js";
import { checkUser } from "../utils.js";
import { upload } from "../utils.js";

const fileRouter = Router();

fileRouter.get("/", getAllFiles);
fileRouter.post("/upload", [checkUser, upload.any()], postUploadFiles);
fileRouter.post("/delete/:fileId", checkUser, postDeleteFile);
fileRouter.get("/:fileId", getFile);

export { fileRouter };
