import { Router } from "express";

const authenticationRouter = Router();

authenticationRouter.get("/login", (req, res, next) => {
  res.render("login");
});

export { authenticationRouter };