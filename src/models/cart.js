import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  date: { type: String, required: true },
  userEmail: { type: String, required: true },
  userCartProducts_ids: {type: Array},
  cartId: { type: String, required: true },
  userId: { type: String, required: true },
  flightList: []
});

export default mongoose.model("Cart", cartSchema);
