import { Router } from "express";
import {
  getLogIn,
  getSignUp,
  postSignUp,
} from "../controllers/authenticationController.js";

const authenticationRouter = Router();

authenticationRouter.get("/login", getLogIn);

authenticationRouter.get("/signup", getSignUp);

authenticationRouter.post("/signup", postSignUp);

export { authenticationRouter };
