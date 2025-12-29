import { Router } from "express";
import {
  getAllPosts,
  getPost,
  getPostForm,
  postDeletePost,
  postPostForm,
} from "../controllers/postController.js";
import { checkUser } from "../utils.js";
import { upload } from "../utils.js";

const postRouter = Router();

postRouter.get("/", getAllPosts);
postRouter.get("/create", checkUser, getPostForm);
postRouter.post("/create", [checkUser, upload.any()], postPostForm);
postRouter.post("/delete/:postId", checkUser, postDeletePost);
postRouter.get("/:postId", getPost);

export { postRouter };
