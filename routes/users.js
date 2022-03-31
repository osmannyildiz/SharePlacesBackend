import express from "express";

const usersRouter = express.Router();

usersRouter.get("/", (req, res) => {
	// TODO
	res.json({ ok: true, message: "GET /users", data: null });
});

export default usersRouter;
