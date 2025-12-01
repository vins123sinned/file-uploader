import multer from "multer";
import { Router } from "express";
import { getFileForm, postFileForm } from "../controllers/fileController.js";

// use a memory storage since the files will be stored to Supabase
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const fileRouter = Router();

fileRouter.get("/upload", getFileForm);
fileRouter.post("/upload", upload.any(), postFileForm);

export { fileRouter };
