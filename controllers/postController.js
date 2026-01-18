import { body, validationResult, matchedData } from "express-validator";
import { format } from "date-fns";
import {
  requiredErr,
  lengthErr,
  deleteAllFiles,
  uploadFiles,
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
    .withMessage("There must not be more than 8 images selected"),
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
  const postsWithFolder = await Promise.all(
    posts.map(async (post) => {
      if (post.folderId) {
        const folder = await folderDb.getFolder(post.folderId);
        return { ...post, folderName: folder.name };
      } else {
        return post;
      }
    }),
  );

  res.render("layout", {
    title: "All posts",
    path: "partials/list.ejs",
    subject: "posts",
    items: postsWithFolder,
  });
};

const getPost = async (req, res) => {
  const { postId } = req.params;
  const post = await postDb.getPost(postId);
  const folder = await folderDb.getFolder(post.folderId);
  const date = format(post.date, "PP");

  res.render("layout", {
    title: post.name,
    path: "partials/postDetail.ejs",
    post: post,
    folder: folder,
    date: date,
  });
};

const getPostForm = async (req, res) => {
  // sets folder input in uploadForm to the folder the user was on (folder list)
  const { folderId } = req.query;
  const folders = await folderDb.getAllFolders();

  res.render("uploadForm", {
    title: "Upload post",
    folders: folders,
    folderId: folderId,
  });
};

const postPostForm = [
  (req, res, next) => next(),
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
      if (folderId) {
        res.redirect(`/folders/${folderId}`);
      } else {
        res.redirect("/posts");
      }
    } catch (err) {
      return next(err);
    }
  },
];

const postDeletePost = async (req, res, next) => {
  const { folderId } = req.query;
  const { postId } = req.params;

  try {
    await deleteAllFiles(postId);
    await postDb.deletePost(postId);
    if (folderId) {
      res.redirect(`/folders/${folderId}`);
    } else {
      res.redirect("/posts");
    }
  } catch (err) {
    return next(err);
  }
};

export { getAllPosts, getPost, getPostForm, postPostForm, postDeletePost };
