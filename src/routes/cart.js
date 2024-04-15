import express from "express";
import {
  ADD_CART,
  GET_CART_BY_ID,
  GET_CARTS,
  ADD_TO_CART,
  DELETE_FLIGHT_BY_ID_FROM_CART
} from "../controller/cart.js";
import auth from "../middleware/auth.js"
import validation from "../middleware/validation.js"
import cartSchema from "../validationSchema/cart.js";

const router = express.Router();

router.post("/carts", auth, validation(cartSchema), ADD_CART);

router.get("/carts/:id", auth, GET_CART_BY_ID);

router.get("/carts", auth, GET_CARTS);

router.post("/addToCart/:flightId", auth,  ADD_TO_CART);

router.delete("/carts/:cartId/flight/:flightId", auth, DELETE_FLIGHT_BY_ID_FROM_CART);

export default router;
