import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  userId: {type: String, required: true},
  password: {type: String,  required: true},
  userCartProducts_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Flight' }]
});

export default mongoose.model("User", userSchema);
