import express from "express";

const placesRouter = express.Router();

placesRouter.get("/", (req, res) => {
	// TODO
	res.json({ ok: true, message: "GET /places", data: null });
});

export default placesRouter;
