import mongoose from "mongoose";

const flightSchema = mongoose.Schema({
  flightId: {type: String, required: true, unique: true},
  price: { type: Number, required: true },
  departureCity: { type: String, required: true, min: 2 },
  destinationCity: { type: String, required: true, min: 2 },
  destinationCityPhotoUrl: { type: String, required: true },
  departureTime: { type: Date, required: true, default: Date.now },
});

export default mongoose.model("Flight", flightSchema);
