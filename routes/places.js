import express from "express";
import { check } from "express-validator";
import {
	createPlace,
	deletePlace,
	getPlace,
	getPlaces,
	updatePlace,
} from "../controllers/places.js";

const placesRouter = express.Router();

placesRouter.get("/", getPlaces);
placesRouter.post(
	"/",
	[
		check("title").notEmpty(),
		check("description").isLength({ min: 5 }),
		check("address").notEmpty(),
	],
	createPlace
);

placesRouter.get("/:id", getPlace);
placesRouter.patch("/:id", updatePlace);
placesRouter.delete("/:id", deletePlace);

export default placesRouter;
