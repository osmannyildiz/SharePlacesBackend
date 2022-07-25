import jwt from "jsonwebtoken";
import HttpError from "../models/httpError.js";

const checkAuth = (req, res, next) => {
	if (req.method === "OPTIONS") {
		return next();
	}

	const error = new HttpError(
		403,
		"Authentication failed. You must login or register to perform this operation."
	);

	try {
		const token = req.headers["authorization"].split(" ")[1];
		if (!token) {
			return next(error);
		}
		const payload = jwt.verify(token, process.env.JWT_KEY);

		req.tokenPayload = payload;
		return next();
	} catch (err) {
		return next(error);
	}
};

export default checkAuth;
