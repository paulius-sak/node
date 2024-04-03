import FlightModel from "../models/flight.js";

const CREATE_FLIGHT = async (req, res) => {
  try {
    const flight = new FlightModel({
      price: req.body.price,
      departureCity: req.body.departureCity,
      destinationCity: req.body.destinationCity,
      destinationCityPhotoUrl: req.body.destinationCityPhotoUrl,
      departureTime: req.body.departureTime,
    });
    flight.id = flight._id.toString()

    const response = await flight.save();

    return res
      .status(201)
      .json({ status: "Flight was created", response: response });
  } catch (err) {
    console.log("handled error: ", err);
    return res.status(500).json({ message: "error happened" });
  }
};

const GET_ALL_FLIGHTS = async (req, res) => {
  try {
    const flights = await FlightModel.find();
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedFlights = flights.slice(startIndex, endIndex);

    const hasNextPage = endIndex < flights.length;

    return res.json({ flights: paginatedFlights, hasNextPage });
  } catch (err) {
    console.log("handled error: ", err);
    return res.status(500).json({ message: "error happened" });
  }
};

const GET_FLIGHT_BY_ID = async (req, res) => {
  try {
    const flight = await FlightModel.findById(req.params.id);

    if (!flight) {
      return res
        .status(404)
        .json({ message: `Flight with id: ${req.params.id} was not found` });
    }

    return res.json({ flight: flight });
  } catch (err) {
    console.log("handled error: ", err);
    return res.status(500).json({ message: "error happened" });
  }
};

const DELETE_FLIGHT = async (req, res) => {
  try {
    const deletedFlight = await FlightModel.findByIdAndDelete(req.params.id);

    if (!deletedFlight) {
      return res
        .status(404)
        .json({ message: `Flight width id: ${req.params.id} not found` });
    }

    return res
      .status(200)
      .json({ message: `Flight with id: ${req.params.id} was deleted` });
  } catch (err) {
    console.log("handled error: ", err);
    return res.status(500).json({ message: "error happened" });
  }
};

const UPDATE_FLIGHT_BY_ID = async (req, res) => {
  try {
    const updatedFlight = await FlightModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedFlight) {
      return res
        .status(404)
        .json({ message: `Flight width id: ${req.params.id} not found` });
    }

    return res.json({ updatedFlight: updatedFlight });
  } catch (err) {
    console.log("handled error: ", err);
    return res.status(500).json({ message: "error happened" });
  }
};

export {
  CREATE_FLIGHT,
  GET_ALL_FLIGHTS,
  GET_FLIGHT_BY_ID,
  DELETE_FLIGHT,
  UPDATE_FLIGHT_BY_ID,
};
