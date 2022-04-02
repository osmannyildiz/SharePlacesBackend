import { validationResult } from "express-validator";
import { v4 as uuidv4 } from "uuid";
import { PLACES } from "../dummyData.js";
import HttpError from "../models/httpError.js";
import { getCoordinatesForAddress } from "../utils/geo.js";

export function getPlaces(req, res, next) {
	const { userId } = req.query;

	let places = PLACES;

	if (userId) {
		places = places.filter((place) => place.userId === userId);
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

export async function createPlace(req, res, next) {
	const validationErrors = validationResult(req);
	if (!validationErrors.isEmpty()) {
		return next(
			new HttpError(400, "The input data is invalid.", validationErrors)
		);
	}

	let coordinates;
	try {
		coordinates = await getCoordinatesForAddress(req.body.address);
	} catch (err) {
		return next(err);
	}

	const place = {
		id: uuidv4(),
		userId: "424d3eca-a195-4bdd-8698-fe0deea25fc8", // TODO
		title: req.body.title,
		description: req.body.description,
		// imageUrl: req.body.imageUrl,
		address: req.body.address,
		coordinates: coordinates,
	};

	PLACES.push(place);

	return res.status(201).json({ ok: true, data: place });
}

export function updatePlace(req, res, next) {
	const validationErrors = validationResult(req);
	if (!validationErrors.isEmpty()) {
		return next(
			new HttpError(400, "The input data is invalid.", validationErrors)
		);
	}

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

	// PLACES = PLACES.filter((place) => place.id !== id);

	const placeIdx = PLACES.findIndex((place) => place.id === id);
	if (placeIdx === -1) {
		return next(new HttpError(404, "This place doesn't exist."));
	}

	PLACES.splice(placeIdx, 1);

	return res.json({ ok: true });
}
