import express from "express";
import { getPlaceById, getPlaces } from "../controllers/places.js";

const placesRouter = express.Router();

placesRouter.get("/", getPlaces);
placesRouter.get("/:id", getPlaceById);

export default placesRouter;
