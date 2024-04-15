import express from "express";
import {
  CREATE_FLIGHT,
  GET_ALL_FLIGHTS,
  GET_FLIGHT_BY_ID,
  DELETE_FLIGHT,
  UPDATE_FLIGHT_BY_ID,
} from "../controller/flight.js";
import auth from "../middleware/auth.js"
import validation from "../middleware/validation.js"
import flightSchema from "../validationSchema/flight.js";

const router = express.Router();

router.post("/flights",validation(flightSchema), auth, CREATE_FLIGHT);

router.get("/flights", auth, GET_ALL_FLIGHTS);

router.get("/flights/:flightId", auth, GET_FLIGHT_BY_ID);

router.delete("/flights/:flightId", auth, DELETE_FLIGHT);

router.put("/flights/:flightId", auth, UPDATE_FLIGHT_BY_ID);

export default router;
