import express from "express";
import { PLACES } from "../dummyData.js";

const placesRouter = express.Router();

// Get places (filter by user id)
placesRouter.get("/", (req, res, next) => {
	const { userId } = req.query;

	let places = PLACES;

	if (userId) {
		places = places.filter((place) => place.userId === parseInt(userId));
	}

	// if (!places) {  // Doesn't work
	if (!places.length) {
		const error = new Error("No place found.");
		error.statusCode = 404;
		return next(error);
	}

	return res.json({ ok: true, data: places });
});

// Get place by id
placesRouter.get("/:id", (req, res, next) => {
	const { id } = req.params;

	const place = PLACES.find((place) => place.id === parseInt(id));
	if (!place) {
		const error = new Error("This place doesn't exist.");
		error.statusCode = 404;
		return next(error);
	}

	return res.json({ ok: true, data: place });
});

export default placesRouter;
