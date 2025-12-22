import { body, validationResult, matchedData } from "express-validator";
import {
  requiredErr,
  lengthErr,
  uploadFiles,
  deleteAllFiles,
} from "../utils.js";
import { postDb } from "../db/Post.js";
import { folderDb } from "../db/Folder.js";

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
  body("folderId")
    .custom((value) => {
      // only allow numbers, as that's what our folder ids are currently!
      const numRegex = /^[0-9]*$/g;

      if (!value === "" || !numRegex.test(value))
        throw new Error("Incorrect option value!");

      return true;
    })
    .withMessage("The folder selected is invalid"),
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

const getPostForm = async (req, res) => {
  const folders = await folderDb.getAllFolders();

  res.render("uploadForm", {
    title: "Upload post",
    folders: folders,
  });
};

const postPostForm = [
  validatePostForm,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const folders = await folderDb.getAllFolders();

      return res.status(400).render("uploadForm", {
        title: "Upload post",
        folders: folders,
        previousValues: req.body,
        errors: errors.array(),
      });
    }

    const { name, folderId } = matchedData(req);

    try {
      const fileIds = await uploadFiles(req.files);

      await postDb.insertPost(name, fileIds, folderId);
      res.redirect("/posts");
    } catch (err) {
      return next(err);
    }
  },
];

const getEditForm = async (req, res) => {
  const { postId } = req.params;
  const folders = await folderDb.getAllFolders();
  const post = await postDb.getPost(postId);

  res.render("uploadForm", {
    title: "Upload post",
    folders: folders,
    previousValues: {
      name: post.name,
      images: post.files,
      folderId: post.folderId,
    },
  });
};

const postDeletePost = async (req, res, next) => {
  const { postId } = req.params;

  try {
    await deleteAllFiles(postId);
    await postDb.deletePost(postId);
    res.redirect("/posts");
  } catch (err) {
    return next(err);
  }
};

export {
  getAllPosts,
  getPost,
  getPostForm,
  postPostForm,
  getEditForm,
  postDeletePost,
};
