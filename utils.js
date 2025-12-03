const requiredErr = "is required";
const lengthErr = (minLength, maxLength) =>
  `must be between ${minLength} and ${maxLength} characters`;

// custom middleware to make sure the user is logged in
const checkUser = (req, res, next) => {
  console.log("HEY!");
  if (!res.locals.currentUser) {
    return res.redirect("login");
  } else {
    next();
  }
};

export { requiredErr, lengthErr, checkUser };
