import mongoose from "mongoose";

//Creating schema for user creation
const userCreationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    minLength: 10,
    maxLength: 10,
    required: true,
  },
  Password: {
    type: String,
    minLength: 8,
    maxLength: 16,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    validate: {
      validator: (v) => v.includes("@"),
      message: (message) =>
        console.log(`${message.value} is not a valid email address.`),
    },
  },
  Address: {
    type: String,
    required: true,
  },
});

export default mongoose.model("users", userCreationSchema);
