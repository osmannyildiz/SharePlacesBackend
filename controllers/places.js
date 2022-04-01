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

	const place = PLACES.find((place) => place.id === parseInt(id));
	if (!place) {
		return next(new HttpError(404, "This place doesn't exist."));
	}

	return res.json({ ok: true, data: place });
}
