import { body, validationResult, matchedData } from "express-validator";

const requiredErr = "is required";
const lengthErr = (minLength, maxLength) =>
  `must be between ${minLength} and ${maxLength} characters`;
const emailErr = "must be a valid email address";
const inUseErr = "is already registered";
const passwordError =
  "must have at least 8 characters, one number, and one special character (~`! @#$%^&*()_-+={[}]|\:;\"'<,>.?/)";

const validateSignUp = [
  body("email")
    .trim()
    .isLength({ min: 3, max: 254 })
    .withMessage(`Email ${lengthErr(3, 254)}`)
    .isEmail()
    .withMessage(`Email ${emailErr}`)
    .custom(async (value) => {
      // const email = await (CHECK IF EMAIL EXISTS IN DATABASE ALREADY)

      if (email) {
        throw new Error("Email already in database");
      }
    })
    .withMessage(`Email ${inUseErr}`),
  body("password")
    .trim()
    .notEmpty()
    .withMessage(`Password ${requiredErr}`)
    .custom((value) => {
      // at least 8 characters, one number, and one special character (~`! @#$%^&*()_-+={\[}\]|\:;"'<,>.?/)
      const regex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~`! @#$%^&*()_\-+={\[}\]|\:;"'<,>.?\/])[A-Za-z\d~`! @#$%^&*()_\-+={\[}\]|\:;"'<,>.?\/]{8,}$/gm;

      if (!value.test(regex)) {
        throw new Error("Password does not pass the constraints");
      }
    })
    .withMessage(`Password ${passwordError}`),
];

const getLogIn = (req, res) => {
  res.render("login");
};

const getSignUp = (req, res) => {
  res.render("signup");
};

const postSignUp = [
  validateSignUp,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("signup", {
        errors: errors.array(),
      });
    }

    const { email, password } = matchedData(req);
    console.log("Gucci.");
    // add to prisma
    res.redirect("/");
  },
];

export { getLogIn, getSignUp, postSignUp };
