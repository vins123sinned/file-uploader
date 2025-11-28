const getFileForm = (req, res) => {
  if (!res.locals.currentUser) return res.redirect("/login");
  res.render("uploadForm");
};

const postFileForm = (req, res) => {
  console.log(req.files);
  res.send("Done!");
};

export { getFileForm, postFileForm };
