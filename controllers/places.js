import { v4 as uuidv4 } from "uuid";
import { PLACES } from "../dummyData.js";
import HttpError from "../models/httpError.js";

export function getPlaces(req, res, next) {
	const { userId } = req.query;

	let places = PLACES;

	if (userId) {
		places = places.filter((place) => place.userId === parseInt(userId));
	}

	if (!places.length) {
		return next(new HttpError(404, "No place found."));
	}

	return res.json({ ok: true, data: places });
}

export function getPlaceById(req, res, next) {
	const { id } = req.params;

	const place = PLACES.find((place) => place.id === id);
	if (!place) {
		return next(new HttpError(404, "This place doesn't exist."));
	}

	return res.json({ ok: true, data: place });
}

export function createPlace(req, res, next) {
	const place = {
		id: uuidv4(),
		userId: 1, // TODO
		title: req.body.title,
		description: req.body.description,
		imageUrl: req.body.imageUrl,
		address: req.body.address,
		coordinates: req.body.coordinates,
	};

	PLACES.push(place);

	return res.status(201).json({ ok: true, data: place });
}
