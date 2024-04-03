import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  date: { type: String, required: true },
  userEmail: { type: String, required: true },
  userCartProducts_ids: {type: Array}
});

export default mongoose.model("Cart", cartSchema);