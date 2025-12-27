import { Router } from "express";
import {
  getAllFiles,
  getFile,
  postDeleteFile,
  postDeleteSupabaseFile,
  postUploadFiles,
} from "../controllers/fileController.js";
import { checkUser } from "../utils.js";
import { upload } from "../utils.js";

const fileRouter = Router();

fileRouter.get("/", getAllFiles);
fileRouter.post("/upload", [checkUser, upload.any()], postUploadFiles);
fileRouter.post("/delete/:fileId", checkUser, postDeleteFile);
fileRouter.post("/delete-supabase/:fileName", postDeleteSupabaseFile);
fileRouter.get("/:fileId", getFile);

export { fileRouter };
