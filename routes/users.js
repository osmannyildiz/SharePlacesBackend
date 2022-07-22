import express from "express";
import { check } from "express-validator";
import { getUsers, login, register } from "../controllers/users.js";
import imageUpload from "../middlewares/imageUpload.js";

const usersRouter = express.Router();

usersRouter.get("/", getUsers);

usersRouter.post(
	"/register",
	imageUpload.single("image"),
	[
		check("name").notEmpty(),
		check("email").normalizeEmail().isEmail(),
		check("password").isLength({ min: 6 }),
	],
	register
);

usersRouter.post("/login", login);

export default usersRouter;
