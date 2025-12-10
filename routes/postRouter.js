import multer from "multer";
import { Router } from "express";
import {
  getAllPosts,
  getPost,
  getPostForm,
  postDeletePost,
  postPostForm,
} from "../controllers/postController.js";
import { checkUser } from "../utils.js";

// use a memory storage since the files will be stored to Supabase
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const postRouter = Router();

postRouter.get("/", getAllPosts);
postRouter.get("/create", checkUser, getPostForm);
postRouter.post("/create", [checkUser, upload.any()], postPostForm);
postRouter.post("/delete/:postId", checkUser, postDeletePost);
postRouter.get("/:postId", getPost);

export { postRouter };
