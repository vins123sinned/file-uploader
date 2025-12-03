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

  res.render("folderList", {
    folders: folders,
  });
};

const getFolder = async (req, res) => {
  const { folderId } = req.params;
  const folder = await folderDb.getFolder(Number(folderId));

  res.render("folderDetail", {
    folder: folder,
  });
};

const getFolderForm = (req, res) => {
  if (!res.locals.currentUser) return res.redirect("login");
  res.render("folderForm");
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
      res.redirect("/");
    } catch (err) {
      return next(err);
    }
  },
];

export { getAllFolders, getFolder, getFolderForm, postFolderForm };
