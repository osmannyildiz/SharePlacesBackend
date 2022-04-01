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

export function getPlace(req, res, next) {
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

export function updatePlace(req, res, next) {
	const { id } = req.params;

	const placeIdx = PLACES.findIndex((place) => place.id === id);
	if (placeIdx === -1) {
		return next(new HttpError(404, "This place doesn't exist."));
	}

	// const updatedPlace = {
	// 	...PLACES[placeIdx],
	// 	title: req.body.title,
	// 	description: req.body.description,
	// };
	// PLACES[placeIdx] = updatedPlace;

	const updatedPlace = { ...PLACES[placeIdx] };
	const allowed = ["title", "description"];
	for (const [key, val] of Object.entries(req.body)) {
		if (allowed.includes(key)) {
			updatedPlace[key] = val;
		}
	}
	PLACES[placeIdx] = updatedPlace;

	return res.json({ ok: true, data: updatedPlace });
}

export function deletePlace(req, res, next) {
	const { id } = req.params;
}
