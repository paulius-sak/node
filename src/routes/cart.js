import express from "express";
import {
  ADD_CART,
  GET_CART_BY_ID,
  GET_CARTS,
  ADD_TO_CART,
  DELETE_FLIGHT_BY_ID_FROM_CART
} from "../controller/cart.js";

const router = express.Router();

router.post("/carts", ADD_CART);

router.get("/carts/:id", GET_CART_BY_ID);

router.get("/carts", GET_CARTS);

router.post("/addToCart/:flightId", ADD_TO_CART);

router.delete("/carts/:cartId/flight/:flightId", DELETE_FLIGHT_BY_ID_FROM_CART);

export default router;
