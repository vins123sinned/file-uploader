import { body, validationResult, matchedData } from "express-validator";
import { requiredErr, lengthErr } from "../utils.js";
import { folderDb } from "../db/Folder.js";

const validateFolderForm = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage(`Name ${requiredErr}`)
    .bail()
    .isLength({ max: 256 })
    .withMessage(`Name ${lengthErr(1, 256)}`),
];

const getAllFolders = async (req, res) => {
  const folders = await folderDb.getAllFolders();

  res.render("list", {
    subject: "folders",
    items: folders,
  });
};

const getFolder = async (req, res) => {
  const { folderId } = req.params;
  const folder = await folderDb.getFolder(folderId);
  const posts = await folderDb.getAllPosts(folderId);

  res.render("folderDetail", {
    folder: folder,
    posts: posts,
  });
};

const getFolderForm = (req, res) => {
  res.render("folderForm", {
    title: "Create a folder",
    action: "/folders/create",
  });
};

const postFolderForm = [
  validateFolderForm,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("folderForm", {
        previousValues: req.body,
        errors: errors.array(),
      });
    }

    const { name } = matchedData(req);
    try {
      await folderDb.insertFolder(name);
      res.redirect("/folders");
    } catch (err) {
      return next(err);
    }
  },
];

const getUpdateForm = async (req, res) => {
  const { folderId } = req.params;
  const folder = await folderDb.getFolder(folderId);

  res.render("folderForm", {
    title: "Update folder",
    action: `/folders/update/${folderId}`,
    previousValues: {
      name: folder.name,
    },
  });
};

const postUpdateForm = [
  validateFolderForm,
  async (req, res, next) => {
    const { folderId } = req.params;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("folderForm", {
        title: "Update folder",
        action: `/folders/update/${folderId}`,
        previousValues: req.body,
        errors: errors.array(),
      });
    }

    const { name } = matchedData(req);
    try {
      await folderDb.updateFolder(folderId, name);
      res.redirect("/folders");
    } catch (err) {
      return next(err);
    }
  },
];

const postDeleteFolder = async (req, res, next) => {
  const { folderId } = req.params;

  try {
    await folderDb.deleteFolder(folderId);
    res.redirect("/folders");
  } catch (err) {
    return next(err);
  }
};

export {
  getAllFolders,
  getFolder,
  getFolderForm,
  postFolderForm,
  getUpdateForm,
  postUpdateForm,
  postDeleteFolder,
};
