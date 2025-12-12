import { body, validationResult, matchedData } from "express-validator";
import { requiredErr, lengthErr, uploadFiles } from "../utils.js";
import { postDb } from "../db/Post.js";

const validatePostForm = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage(`Name ${requiredErr}`)
    .bail()
    .isLength({ max: 254 })
    .withMessage(`Name ${lengthErr(1, 254)}`),
  body("images")
    .custom((value, { req }) => {
      if (!req.files || req.files.length === 0)
        throw new Error("No images attached!");

      return true;
    })
    .withMessage("At least one image must be selected")
    .bail()
    .custom((value, { req }) => {
      if (req.files.length > 8) throw new Error("Too much images! (arbitrary)");

      return true;
    })
    .withMessage("There must no more than 8 images selected"),
];

const getAllPosts = async (req, res) => {
  const posts = await postDb.getAllPosts();

  res.render("list", {
    subject: "posts",
    items: posts,
  });
};

const getPost = async (req, res) => {
  const { postId } = req.params;
  const post = await postDb.getPost(postId);

  res.render("postDetail", {
    post: post,
  });
};

const getPostForm = (req, res) => {
  if (!res.locals.currentUser) return res.redirect("/login");
  res.render("uploadForm");
};

const postPostForm = [
  validatePostForm,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("uploadForm", {
        previousValues: req.body,
        errors: errors.array(),
      });
    }

    const { name } = matchedData(req);

    try {
      const fileIds = await uploadFiles(req.files);

      await postDb.insertPost(name, fileIds);
      res.redirect("/posts");
    } catch (err) {
      return next(err);
    }
  },
];

const postDeletePost = async (req, res, next) => {
  const { postId } = req.params;

  try {
    await postDb.deletePost(postId);
    await // utils.js delete all files
    res.redirect("/posts");
  } catch (err) {
    return next(err);
  }
};

export { getAllPosts, getPost, getPostForm, postPostForm, postDeletePost };
