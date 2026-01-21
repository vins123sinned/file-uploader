import { Router } from "express";
import { downloadFile, postDeleteFile } from "../controllers/fileController.js";
import { checkUser } from "../utils.js";

const fileRouter = Router();

fileRouter.get("/download/:filename", downloadFile);
fileRouter.post("/delete/:fileId", checkUser, postDeleteFile);

export { fileRouter };
