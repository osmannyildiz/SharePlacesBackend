import express from "express";
import { PLACES } from "../dummyData.js";

const placesRouter = express.Router();

// Get places (filter by user id)
placesRouter.get("/", (req, res) => {
	const { userId } = req.query;

	let places = PLACES;

	if (userId) {
		places = places.filter((place) => place.userId === parseInt(userId));
	}

	res.json({ ok: true, data: places });
});

// Get place by id
placesRouter.get("/:id", (req, res) => {
	const { id } = req.params;

	const place = PLACES.find((place) => place.id === parseInt(id));
	if (!place) {
		// TODO Return 404
		return res.json({ ok: false, message: "This place doesn't exist." });
	}

	res.json({ ok: true, data: place });
});

export default placesRouter;
