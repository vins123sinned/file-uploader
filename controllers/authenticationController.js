import bcrypt from "bcryptjs";
import passport from "passport";
import { body, validationResult, matchedData } from "express-validator";
import { userDb } from "../db/User.js";
import { requiredErr, lengthErr } from "../utils.js";

const emailErr = "must be a valid email address";
const inUseErr = "is already registered";
const spaceError = "must not include any spaces";
const passwordError =
  "must have at least 8 characters, one number, and one special character";

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
      const user = await userDb.getUserByEmail(value);

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

const postLogIn = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.status(400).render("login", {
        previousValues: req.body,
        errors: [
          {
            path: "authentication",
            msg: "The username or password is incorrect",
          },
        ],
      });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.redirect("/");
    });
  })(req, res, next);
};

passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
});

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
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      await userDb.insertUser(email, hashedPassword);
      res.redirect("/");
    } catch (err) {
      return next(err);
    }
  },
];

const getLogOut = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
};

export { getLogIn, postLogIn, getSignUp, postSignUp, getLogOut };
