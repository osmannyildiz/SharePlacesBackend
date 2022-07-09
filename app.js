import bodyParser from "body-parser";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
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
		data: error.data,
	});
});

const mongoUrl = `mongodb://127.0.0.1/yourplaces?replicaSet=rs0`;
mongoose
	.connect(mongoUrl)
	.then(() => {
		app.listen(5000, () => console.log("Listening on :5000"));
	})
	.catch((err) => console.error(err));
