import { body, validationResult, matchedData } from "express-validator";
import { folderDb } from "../db/Folder.js";

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

const postShareFolder = [
  validateShareForm,
  async (req, res, next) => {
    const { folderId } = req.params;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const folders = await folderDb.getAllFolders();

      return res.status(400).render("list", {
        title: "All folders",
        action: `/share/${folderId}`,
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

export { postShareFolder };
