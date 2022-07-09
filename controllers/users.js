import { validationResult } from "express-validator";
import HttpError from "../models/httpError.js";
import { User } from "../models/user.js";

export async function getUsers(req, res, next) {
	let users;
	try {
		users = await User.find({}, "-password");
	} catch (err) {
		return next(new HttpError(500, "Something went wrong."));
	}

	if (!users || !users.length) {
		return next(new HttpError(404, "No user found."));
	}

	return res.json({
		ok: true,
		data: users.map((user) => user.toObject({ getters: true })),
	});
}

export async function register(req, res, next) {
	const validationErrors = validationResult(req);
	if (!validationErrors.isEmpty()) {
		return next(
			new HttpError(400, "The input data is invalid.", validationErrors)
		);
	}

	let emailExists;
	try {
		emailExists = await User.findOne({ email: req.body.email });
	} catch (err) {
		return next(new HttpError(500, "Something went wrong."));
	}
	if (emailExists) {
		return next(
			new HttpError(422, "There is already a user registered with this email.")
		);
	}

	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		imageUrl: req.body.imageUrl,
		places: [],
	});

	try {
		await user.save();
	} catch (err) {
		console.error(err);
		return next(new HttpError(500, "Could not create user."));
	}

	return res
		.status(201)
		.json({ ok: true, data: user.toObject({ getters: true }) });
}

export async function login(req, res, next) {
	let user;
	try {
		user = await User.findOne({ email: req.body.email });
	} catch (err) {
		return next(new HttpError(500, "Something went wrong."));
	}

	if (!user) {
		// TODO Change message (make it obscure)
		return next(
			new HttpError(401, "There isn't a user registered with this email.")
		);
	}

	if (user.password !== req.body.password) {
		// TODO Change message (make it obscure)
		return next(new HttpError(401, "The password is incorrect."));
	}

	return res.json({
		ok: true,
		message: "Logged in.",
		data: user.toObject({ getters: true }),
	});
}
