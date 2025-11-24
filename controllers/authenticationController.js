import { body, validationResult, matchedData } from "express-validator";
import { getUserByEmail, insertUser } from "../db/queries.js";

const requiredErr = "is required";
const lengthErr = (minLength, maxLength) =>
  `must be between ${minLength} and ${maxLength} characters`;
const emailErr = "must be a valid email address";
const inUseErr = "is already registered";
const spaceError = "must not include any spaces";
const passwordError =
  "must have at least 8 characters, one number, and one special character";

const validateLogIn = [
  body("email").trim().notEmpty().withMessage(`Email ${requiredErr}`),
  body("password").trim().notEmpty().withMessage(`Password ${requiredErr}`),
];

const validateSignUp = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage(`Email ${requiredErr}`)
    .bail()
    .isLength({ min: 3, max: 254 })
    .withMessage(`Email ${lengthErr(3, 254)}`)
    .bail()
    .isEmail()
    .withMessage(`Email ${emailErr}`)
    .bail()
    .custom(async (value) => {
      const user = await getUserByEmail(value);

      if (user) throw new Error("Email already in database");
      return true;
    })
    .withMessage(`Email ${inUseErr}`),
  body("password")
    // omit trim here to let users know NO SPACES (even at the start or end)
    .notEmpty()
    .withMessage(`Password ${requiredErr}`)
    .bail()
    .custom((value) => {
      const spaceRegex = /\s/;

      if (spaceRegex.test(value)) throw new Error("Password contains spaces");
      return true;
    })
    .withMessage(`Password ${spaceError}`)
    .bail()
    .custom((value) => {
      // at least 8 characters, one number, and one non-alphanumeric (NO SPACES!)
      const regex = /^(?=.*\d)(?=.*[^\w\s])[^\s]{8,}$/;

      if (!regex.test(value))
        throw new Error("Password does not pass the constraints");
      return true;
    })
    .withMessage(`Password ${passwordError}`),
];

const getLogIn = (req, res) => {
  res.render("login");
};

const postLogIn = [
  validateLogIn,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("login", {
        previousValues: req.body,
        errors: errors.array(),
      });
    }

    // validate with passport later
    // this might also be deleted...

    console.log("we good.");
  },
];

const getSignUp = (req, res) => {
  res.render("signup");
};

const postSignUp = [
  validateSignUp,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("signup", {
        previousValues: req.body,
        errors: errors.array(),
      });
    }

    const { email, password } = matchedData(req);
    try {
      await insertUser(email, password);
      res.redirect("/");
    } catch (err) {
      return next(err);
    }
  },
];

export { getLogIn, postLogIn, getSignUp, postSignUp };
