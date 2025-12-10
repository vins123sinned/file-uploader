import { Router } from "express";
import {
  getAllFiles,
  getFile,
  postDeleteFile,
} from "../controllers/fileController.js";
import { checkUser } from "../utils.js";

const fileRouter = Router();

fileRouter.get("/", getAllFiles);
fileRouter.post("/delete/:fileId", checkUser, postDeleteFile);
fileRouter.get("/:fileId", getFile);

export { fileRouter };
