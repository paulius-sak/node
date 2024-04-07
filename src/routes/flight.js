import express from "express";
import {
  CREATE_FLIGHT,
  GET_ALL_FLIGHTS,
  GET_FLIGHT_BY_ID,
  DELETE_FLIGHT,
  UPDATE_FLIGHT_BY_ID,
} from "../controller/flight.js";

const router = express.Router();

router.post("/flights", CREATE_FLIGHT);

router.get("/flights", GET_ALL_FLIGHTS);

router.get("/flights/:flightId", GET_FLIGHT_BY_ID);

router.delete("/flights/:flightId", DELETE_FLIGHT);

router.put("/flights/:flightId", UPDATE_FLIGHT_BY_ID);

export default router;
