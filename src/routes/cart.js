import express from "express";
import {
  ADD_CART,
  GET_CART_BY_ID,
  GET_CARTS,
  ADD_TO_CART
} from "../controller/cart.js";

const router = express.Router();

router.post("/carts", ADD_CART);

router.get("/carts/:id", GET_CART_BY_ID);

router.get("/carts", GET_CARTS);

router.post("/addToCart/:id", ADD_TO_CART);

export default router;
