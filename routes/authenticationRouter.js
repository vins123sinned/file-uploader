import express from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Router } from "express";
import {
  getLogIn,
  getSignUp,
  postLogIn,
  postSignUp,
} from "../controllers/authenticationController.js";

/*
passport.use(new LocalStrategy(async (email, password, done) => {
  try {

  }
}));
*/

const authenticationRouter = Router();

authenticationRouter.get("/login", getLogIn);

authenticationRouter.post("/login", postLogIn);

authenticationRouter.get("/signup", getSignUp);

authenticationRouter.post("/signup", postSignUp);

export { authenticationRouter };
