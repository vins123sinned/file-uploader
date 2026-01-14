const getHomepage = (req, res) => {
  res.render("layout", {
    title: "Alimenté",
    path: "basicHomepage",
  });
};

export { getHomepage };
