import express from "express";
import {
	createPlace,
	deletePlace,
	getPlace,
	getPlaces,
	updatePlace,
} from "../controllers/places.js";

const placesRouter = express.Router();

placesRouter.get("/", getPlaces);
placesRouter.post("/", createPlace);

placesRouter.get("/:id", getPlace);
placesRouter.patch("/:id", updatePlace);
placesRouter.delete("/:id", deletePlace);

export default placesRouter;
