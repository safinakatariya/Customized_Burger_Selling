import mongoose from "mongoose";

const burgerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }
}, { minimize: false });

const Burger = mongoose.models.Burger || mongoose.model("Burger", burgerSchema);
export default Burger;