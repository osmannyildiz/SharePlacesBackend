import bodyParser from "body-parser";
import express from "express";
import placesRouter from "./routes/places.js";
import usersRouter from "./routes/users.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/users", usersRouter);
app.use("/api/places", placesRouter);

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
