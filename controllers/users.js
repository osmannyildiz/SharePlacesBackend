import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import HttpError from "../models/httpError.js";
import User from "../models/user.js";

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

	let passwordHash;
	try {
		passwordHash = await bcrypt.hash(req.body.password, 12);
	} catch (err) {
		return next(new HttpError(500, "Could not create user."));
	}

	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: passwordHash,
		imageUrl: req.file.path,
		places: [],
	});

	try {
		await user.save();
	} catch (err) {
		return next(new HttpError(500, "Could not create user."));
	}

	let token;
	try {
		token = jwt.sign({ userId: user.id, email: user.email }, "s3cr3t", {
			expiresIn: "1h",
		});
	} catch (err) {
		return next(new HttpError(500, "Something went wrong."));
	}

	return res.status(201).json({
		ok: true,
		data: {
			userId: user.id,
			email: user.email,
			name: user.name,
			imageUrl: user.imageUrl,
			token: token,
		},
	});
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
			new HttpError(403, "There isn't a user registered with this email.")
		);
	}

	let passwordIsCorrect;
	try {
		passwordIsCorrect = await bcrypt.compare(req.body.password, user.password);
	} catch (err) {
		return next(new HttpError(500, "Something went wrong."));
	}
	if (!passwordIsCorrect) {
		// TODO Change message (make it obscure)
		return next(new HttpError(403, "The password is incorrect."));
	}

	let token;
	try {
		token = jwt.sign({ userId: user.id, email: user.email }, "s3cr3t", {
			expiresIn: "1h",
		});
	} catch (err) {
		return next(new HttpError(500, "Something went wrong."));
	}

	return res.json({
		ok: true,
		message: "Logged in.",
		data: {
			userId: user.id,
			email: user.email,
			name: user.name,
			imageUrl: user.imageUrl,
			token: token,
		},
	});
}
