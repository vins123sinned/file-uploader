import { body, validationResult, matchedData } from "express-validator";
import { folderDb } from "../db/Folder.js";
import { shareDb } from "../db/Share.js";

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

const getShareFolder = async (req, res, next) => {
  const { folderName } = req.params;

  try {
    const sharedFolder = await shareDb.getShare(folderName);

    if (sharedFolder === null) throw new Error("No link found!");

    const folder = await folderDb.getFolder(sharedFolder.folderId);
    const posts = await folderDb.getAllPosts(sharedFolder.folderId);
    res.render("folderDetail", {
      folder: folder,
      posts: posts,
    });
  } catch (err) {
    next(err);
  }
};

const postShareFolder = [
  validateShareForm,
  async (req, res, next) => {
    console.log(req.body); // HELLO!
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
      const name = crypto.randomUUID();
      const date = new Date();
      switch (duration) {
        case "day":
          date.setDate(date.getDate() + 1);
          break;
        case "week":
          date.setDate(date.getDate() + 7);
          break;
        case "month":
          date.setDate(date.getDate() + 31);
          break;
      }

      const sharedFolder = await shareDb.insertShare(name, date, folderId);
      res.json(sharedFolder);
    } catch (err) {
      next(err);
    }
  },
];

export { getShareFolder, postShareFolder };
