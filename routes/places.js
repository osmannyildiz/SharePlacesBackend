import express from "express";
import { createPlace, getPlaceById, getPlaces } from "../controllers/places.js";

const placesRouter = express.Router();

placesRouter.get("/", getPlaces);
placesRouter.post("/", createPlace);

placesRouter.get("/:id", getPlaceById);

export default placesRouter;
