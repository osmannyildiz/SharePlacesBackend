import bodyParser from "body-parser";
import "dotenv/config";
import express from "express";
import fs from "fs";
import mongoose from "mongoose";
import HttpError from "./models/httpError.js";
import placesRouter from "./routes/places.js";
import usersRouter from "./routes/users.js";

const app = express();
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
	return next();
});

// Static files
app.use("/static", express.static("static"));

app.use("/api/users", usersRouter);
app.use("/api/places", placesRouter);

// Catch unimplemented routes
app.use((req, res, next) => {
	return next(new HttpError(404, "Not found."));
});

// Handle errors
app.use((error, req, res, next) => {
	if (req.file) {
		fs.unlink(req.file.path, (err) => {
			if (err) console.error(err);
		});
	}

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

mongoose
	.connect(process.env.MONGODB_CONNECTION_STRING)
	.then(() => {
		app.listen(5000, () => console.log("Listening on :5000"));
	})
	.catch((err) => console.error(err));
