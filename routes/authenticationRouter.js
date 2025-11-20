import { Router } from "express";

const authenticationRouter = Router();

authenticationRouter.get("/login", (req, res) => {
  res.render("login");
});

authenticationRouter.get("/signup", (req, res) => {
  res.render("signup");
});

export { authenticationRouter };
