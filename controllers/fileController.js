import { body, validationResult, matchedData } from "express-validator";
import { requiredErr, lengthErr } from "../utils.js";
import { fileDb } from "../db/File.js";

const validateFileForm = [
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

const getAllFiles = async (req, res) => {
  const files = await fileDb.getAllFiles();

  res.render("list", {
    subject: "files",
    items: files,
  });
};

const getFile = async (req, res) => {
  const { fileId } = req.params;
  const file = await fileDb.getFile(fileId);

  res.render("fileDetail", {
    file: file,
  });
};

const getFileForm = (req, res) => {
  if (!res.locals.currentUser) return res.redirect("/login");
  res.render("uploadForm");
};

const postFileForm = [
  validateFileForm,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("uploadForm", {
        previousValues: req.body,
        errors: errors.array(),
      });
    }

    // finish once Supabase is implemented!
    const { name } = matchedData(req);
    try {
      await fileDb.insertFile(name);
      res.redirect("/files");
    } catch (err) {
      return next(err);
    }
  },
];

const postDeleteFile = async (req, res, next) => {
  const { fileId } = req.params;

  try {
    await fileDb.deleteFile(fileId);
    res.redirect("/files");
  } catch (err) {
    return next(err);
  }
};

export { getAllFiles, getFile, getFileForm, postFileForm, postDeleteFile };
