import multer from "multer";

const getFileForm = (req, res) => {
  if (!res.locals.currentUser) return res.redirect("/login");
  res.render("uploadForm");
};

export { getFileForm };
