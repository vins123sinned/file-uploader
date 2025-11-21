const validateSignUp = [];

const requiredErr = "is required"
const lengthErr = (minLength, maxLength) => `must be between ${minLength} and ${maxLength} characters`
const emailErr = "must be a valid email address"

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