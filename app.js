import bodyParser from "body-parser";
import express from "express";
import HttpError from "./models/httpError.js";
import placesRouter from "./routes/places.js";
import usersRouter from "./routes/users.js";

const app = express();
app.use(bodyParser.json());

app.use("/api/users", usersRouter);
app.use("/api/places", placesRouter);

app.use((req, res, next) => {
	// Unimplemented route
	return next(new HttpError(404, "Not found."));
});

app.use((error, req, res, next) => {
	if (res.headerSent) {
		return next(error);
	}

	res.status(error.statusCode || 500);
	res.json({
		ok: false,
		message: error.message || "An unknown error occurred.",
	});
});

app.listen(5000);
