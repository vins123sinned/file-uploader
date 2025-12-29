import { fileDb } from "../db/File.js";

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

const postDeleteFile = async (req, res, next) => {
  const { fileId } = req.params;

  try {
    await fileDb.deleteFile(fileId);
    res.redirect("/files");
  } catch (err) {
    return next(err);
  }
};

export { getAllFiles, getFile, postDeleteFile };
