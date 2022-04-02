import express from "express";
import { getUsers, login, register } from "../controllers/users.js";

const usersRouter = express.Router();

usersRouter.get("/", getUsers);
usersRouter.post("/register", register);
usersRouter.post("/login", login);

export default usersRouter;
