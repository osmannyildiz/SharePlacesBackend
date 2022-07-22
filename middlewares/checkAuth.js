import jwt from "jsonwebtoken";

const checkAuth = (req, res, next) => {
	if (req.method === "OPTIONS") {
		return next();
	}

	const error = new HttpError(
		401,
		"Authentication failed. You must login or register to perform this operation."
	);

	try {
		const token = req.headers["Authorization"].split(" ")[1];
		if (!token) {
			return next(error);
		}
		const payload = jwt.verify(token, "s3cr3t");

		req.tokenPayload = payload;
		return next();
	} catch (err) {
		return next(error);
	}
};

export default checkAuth;
