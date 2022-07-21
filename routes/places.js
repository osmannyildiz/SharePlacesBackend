import express from "express";
import { check } from "express-validator";
import {
	createPlace,
	deletePlace,
	getPlace,
	getPlaces,
	updatePlace,
} from "../controllers/places.js";
import imageUpload from "../middlewares/imageUpload.js";

const placesRouter = express.Router();

placesRouter.get("/", getPlaces);
placesRouter.post(
	"/",
	imageUpload.single("image"),
	[
		check("title").notEmpty(),
		check("description").isLength({ min: 5 }),
		check("address").notEmpty(),
	],
	createPlace
);

placesRouter.get("/:id", getPlace);
placesRouter.patch(
	"/:id",
	[check("title").notEmpty(), check("description").isLength({ min: 5 })],
	updatePlace
);
placesRouter.delete("/:id", deletePlace);

export default placesRouter;
