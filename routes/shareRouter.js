import { Router } from "express";
import { postShareFolder } from "../controllers/shareController.js";
import { checkUser } from "../utils.js";

const shareRouter = Router();

shareRouter.post("/:folderId", checkUser, postShareFolder);

export { shareRouter };
