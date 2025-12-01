const getFolderForm = (req, res) => {
  if (!res.locals.currentUser) return res.redirect("login");
  res.render("folderForm");
};

export { getFolderForm };
