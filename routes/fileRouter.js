import multer from "multer";
import { Router } from "express";
import {
  getAllFiles,
  getFileForm,
  postFileForm,
} from "../controllers/fileController.js";

// use a memory storage since the files will be stored to Supabase
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const fileRouter = Router();

fileRouter.get("/", getAllFiles);
fileRouter.get("/create", getFileForm);
fileRouter.post("/create", upload.any(), postFileForm);

export { fileRouter };
