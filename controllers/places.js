import { validationResult } from "express-validator";
import HttpError from "../models/httpError.js";
import { Place } from "../models/place.js";
import { PLACES } from "../utils/dummyData.js";
import { getCoordinatesForAddress } from "../utils/geo.js";

export async function getPlaces(req, res, next) {
	const { userId } = req.query;

	let places;
	try {
		if (userId) {
			places = await Place.find({ userId });
		} else {
			places = await Place.find();
		}
	} catch (err) {
		return next(new HttpError(500, "Something went wrong."));
	}

	if (!places.length) {
		return next(new HttpError(404, "No place found."));
	}

	return res.json({
		ok: true,
		data: places.map((place) => place.toObject({ getters: true })),
	});
}

export async function getPlace(req, res, next) {
	const { id } = req.params;

	let place;
	try {
		place = await Place.findById(id);
	} catch (err) {
		return next(new HttpError(500, "Something went wrong."));
	}

	if (!place) {
		return next(new HttpError(404, "This place doesn't exist."));
	}

	return res.json({ ok: true, data: place.toObject({ getters: true }) });
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

	const place = new Place({
		userId: "424d3eca-a195-4bdd-8698-fe0deea25fc8", // TODO
		title: req.body.title,
		description: req.body.description,
		imageUrl: req.body.imageUrl,
		address: req.body.address,
		coordinates: coordinates,
	});

	try {
		await place.save();
	} catch (err) {
		return next(new HttpError(500, "Could not create place."));
	}

	return res
		.status(201)
		.json({ ok: true, data: place.toObject({ getters: true }) });
}

export async function updatePlace(req, res, next) {
	const validationErrors = validationResult(req);
	if (!validationErrors.isEmpty()) {
		return next(
			new HttpError(400, "The input data is invalid.", validationErrors)
		);
	}

	const { id } = req.params;

	let place;
	try {
		place = await Place.findById(id);
	} catch (err) {
		return next(new HttpError(500, "Something went wrong."));
	}

	if (!place) {
		return next(new HttpError(404, "This place doesn't exist."));
	}

	const allowed = ["title", "description"];
	for (const [key, val] of Object.entries(req.body)) {
		if (allowed.includes(key)) {
			place[key] = val;
		}
	}

	try {
		await place.save();
	} catch (err) {
		return next(new HttpError(500, "Could not update place."));
	}

	return res.json({ ok: true, data: place.toObject({ getters: true }) });
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
