import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  oldCart: [{}],
  orderInformation: {
    shippingAddress: String,
    orderNumber: String,
  },
});

export default mongoose.model("order", orderSchema);
