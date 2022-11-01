import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  reviews: {
    type: [],
  },
  price: {
    type: Number,
    // required: true,
  },
  details: {
    type: String,
    // required: true,
  },
  images: {
    type: [],
    // required: true,
  },
  ratings: {
    type: [],
  },
  tags: {
    type: [],
    // required: true,
  },
});
let products = mongoose.model("products", productSchema);
export default products;

// Products: -title - reviews - price - description - details - images - ratings;
