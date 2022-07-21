import { validationResult } from "express-validator";
import fs from "fs";
import mongoose from "mongoose";
import HttpError from "../models/httpError.js";
import Place from "../models/place.js";
import User from "../models/user.js";
import { getCoordinatesForAddress } from "../utils/geo.js";

export async function getPlaces(req, res, next) {
	const { userId } = req.query;

	let places;
	try {
		if (userId) {
			// places = await Place.find({ user: userId });
			const user = await User.findById(userId).populate("places");
			places = user ? user.places : [];
		} else {
			places = await Place.find();
		}
	} catch (err) {
		return next(new HttpError(500, "Something went wrong."));
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

	// Check if the user exists (and authenticated)
	let user;
	try {
		user = await User.findById(req.body.userId); // TODO Auth
	} catch (err) {
		return next(new HttpError(500, "Something went wrong."));
	}
	if (!user) {
		// TODO Change message (make it obscure)
		return next(
			new HttpError(401, "There isn't a user registered with this ID.")
		);
	}

	let coordinates;
	try {
		coordinates = await getCoordinatesForAddress(req.body.address);
	} catch (err) {
		return next(err);
	}

	const place = new Place({
		user: req.body.userId, // TODO Auth
		title: req.body.title,
		description: req.body.description,
		imageUrl: req.file.path,
		address: req.body.address,
		coordinates: coordinates,
	});

	try {
		const session = await mongoose.startSession();
		session.startTransaction();

		await place.save({ session });

		user.places.push(place);
		await user.save({ session });

		await session.commitTransaction();
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

export async function deletePlace(req, res, next) {
	const { id } = req.params;

	let place;
	try {
		place = await Place.findById(id).populate("user");
	} catch (err) {
		return next(new HttpError(500, "Something went wrong."));
	}

	if (!place) {
		return next(new HttpError(404, "This place doesn't exist."));
	}

	const imagePath = place.imageUrl;

	try {
		const session = await mongoose.startSession();
		session.startTransaction();

		await place.remove({ session });

		place.user.places.pull(place);
		await place.user.save({ session });

		await session.commitTransaction();
	} catch (err) {
		return next(new HttpError(500, "Could not delete place."));
	}

	fs.unlink(imagePath, (err) => {
		if (err) console.error(err);
	});

	return res.json({ ok: true });
}
