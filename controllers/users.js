import { v4 as uuidv4 } from "uuid";
import { USERS } from "../dummyData.js";
import HttpError from "../models/httpError.js";

export function getUsers(req, res, next) {
	let users = USERS;

	if (!users.length) {
		return next(new HttpError(404, "No user found."));
	}

	return res.json({ ok: true, data: users });
}

export function register(req, res, next) {
	const emailExists = USERS.find((user) => user.email === req.body.email);
	if (emailExists) {
		return next(
			new HttpError(400, "There is already a user registered with this email.")
		);
	}

	const user = {
		id: uuidv4(),
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
	};

	USERS.push(user);

	return res.status(201).json({ ok: true, data: user });
}

export function login(req, res, next) {
	const user = USERS.find((user) => user.email === req.body.email);
	if (!user) {
		// TODO Change message
		return next(
			new HttpError(401, "There isn't a user registered with this email.")
		);
	}

	if (user.password !== req.body.password) {
		// TODO Change message
		return next(new HttpError(401, "The password is incorrect."));
	}

	return res.json({ ok: true, message: "Logged in.", data: user });
}
