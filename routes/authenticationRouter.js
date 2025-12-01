import bcrypt from "bcryptjs";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Router } from "express";
import {
  getLogIn,
  getSignUp,
  postLogIn,
  postSignUp,
  getLogOut,
} from "../controllers/authenticationController.js";
import { userDb } from "../db/User.js";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        const user = await userDb.getUserByEmail(username);

        if (!user) return done(null, false, { message: "Incorrect email" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return done(null, false, { message: "Incorrect password" });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userDb.getUserById(id);

    done(null, user);
  } catch (err) {
    done(err);
  }
});

const authenticationRouter = Router();

authenticationRouter.get("/login", getLogIn);
authenticationRouter.post("/login", postLogIn);
authenticationRouter.get("/signup", getSignUp);
authenticationRouter.post("/signup", postSignUp);
authenticationRouter.get("/logout", getLogOut);

export { authenticationRouter };
