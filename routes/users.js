import express from "express";
import { check } from "express-validator";
import { getUsers, login, register } from "../controllers/users.js";

const usersRouter = express.Router();

usersRouter.get("/", getUsers);
usersRouter.post(
	"/register",
	[
		check("name").notEmpty(),
		check("email").normalizeEmail().isEmail(),
		check("password").isLength({ min: 6 }),
	],
	register
);
usersRouter.post("/login", login);

export default usersRouter;
