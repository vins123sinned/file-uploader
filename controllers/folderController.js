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

const validateShareForm = [
  body("duration")
    .custom((value) => {
      const acceptedValues = ["day", "week", "month"];

      if (!acceptedValues.includes(value))
        throw new Error("Invalid option value");

      return true;
    })
    .withMessage("The selected option is invalid"),
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

const getEditForm = async (req, res) => {
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

const postEditForm = [
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

const postShareFolder = [
  validateShareForm,
  async (req, res, next) => {
    const { folderId } = req.params;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const folders = await folderDb.getAllFolders();

      return res.status(400).render("list", {
        title: "All folders",
        action: `/folders/share/${folderId}`,
        subject: "folders",
        items: folders,
        previousValues: req.body,
        errors: errors.array(),
      });
    }

    const { duration } = matchedData(req);
    try {
      res.redirect("/");
    } catch {
      next(err);
    }
  },
];

export {
  getAllFolders,
  getFolder,
  getFolderForm,
  postFolderForm,
  getEditForm,
  postEditForm,
  postDeleteFolder,
  postShareFolder,
};
