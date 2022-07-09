import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
	userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
	title: { type: String, required: true },
	description: { type: String, required: true },
	imageUrl: { type: String, required: true },
	address: { type: String, required: true },
	coordinates: {
		lat: { type: Number, required: true },
		lng: { type: Number, required: true },
	},
});

export const Place = mongoose.model("Place", placeSchema);
