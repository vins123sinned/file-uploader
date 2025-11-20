const validateSignUp = [];

const getLogIn = (req, res) => {
  res.render("login");
};

const getSignUp = (req, res) => {
  res.render("signup");
};

const postSignUp = [
  validateSignUp,
  (req, res) => {

  }
];

export { getLogIn, getSignUp, postSignUp };