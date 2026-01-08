const getHomepage = (req, res) => {
  res.render("layout", {
    title: "Alimenté",
  });
};

export { getHomepage };
