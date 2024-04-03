import { v4 as uuidv4 } from 'uuid';
import CartModel from "../models/cart.js";
import FlightModel from "../models/flight.js";
import UserModel from "../models/user.js";

const ADD_CART = async (req, res) => {
  try {
    const cart = new CartModel({
      date: req.body.date,
      userEmail: req.body.userEmail,
      userCartProducts_ids: req.body.userCartProducts_ids,
      cartId: uuidv4()
    });

    const response = await cart.save();

    return res
      .status(201)
      .json({ status: "Cart was added", response: response });
  } catch (err) {
    console.log("handled error: ", err);
    return res.status(500).json({ message: "error happened" });
  }
};

const GET_CARTS = async (req, res) => {
  try {
    const carts = await CartModel.aggregate([
      {
        $lookup: {
          from: "flights",
          localField: "userCartProducts_ids",
          foreignField: "id",
          as: "cart",
        },
      },
    ]).exec();

    return res.json({ carts: carts });
  } catch (err) {
    console.log("HANDLED ERROR: ", err);
    return res.status(500).json({ message: "error happend" });
  }
};

const GET_CART_BY_ID = async (req, res) => {
  try {
    const cart = await CartModel.findOne({ cartId: req.params.id });

    if (!cart) {
      return res
        .status(404)
        .json({ message: `Cart with id: ${req.params.id} was not found` });
    }

    return res.json({ cart: cart });
  } catch (err) {
    console.log("handled error: ", err);
    return res.status(500).json({ message: "error happened" });
  }
};

const ADD_TO_CART = async (req, res) => {
  try {
    const flight = await FlightModel.findById(req.params.id);
    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    const user = await UserModel.findOne({ userEmail: req.body.userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cart = await CartModel.findOneAndUpdate(
      { userEmail: req.body.userEmail },
      { $push: { userCartProducts_ids: flight.id } },
      { new: true, upsert: true }
    );

    return res.status(201).json({ status: "Flight added to cart", cart });
  } catch (err) {
    console.log("Handled error: ", err);
    return res.status(500).json({ message: "Error occurred" });
  }
};

export { ADD_CART, GET_CART_BY_ID, GET_CARTS, ADD_TO_CART };
