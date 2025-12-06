import multer from "multer";
import { Router } from "express";
import {
  getAllFiles,
  getFileForm,
  postDeleteFile,
  postFileForm,
} from "../controllers/fileController.js";
import { checkUser } from "../utils.js";

// use a memory storage since the files will be stored to Supabase
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const fileRouter = Router();

fileRouter.get("/", getAllFiles);
fileRouter.get("/create", checkUser, getFileForm);
fileRouter.post("/create", [checkUser, upload.any()], postFileForm);
fileRouter.post("/delete/:fileId", checkUser, postDeleteFile);

export { fileRouter };
