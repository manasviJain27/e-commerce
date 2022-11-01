import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  // cart: {
  //   type: [],
  // },
  // cart: {
  //   type: [
  //     {
  //       objectId: String,
  //       quantity: Number,
  //     },
  //   ],
  // },
  cart: [],
  userId: {
    type: String,
    required: true,
  },
});

export default mongoose.model("cart", cartSchema);

// Products: -title - reviews - price - description - details - images - ratings;
