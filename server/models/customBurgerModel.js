import mongoose from "mongoose";

const customBurgerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  ingredients: { type: [String], required: true },
  quantity: { type: Number, required: true },
}, { minimize: false });

const CustomBurger = mongoose.models.CustomBurger || mongoose.model("CustomBurger", customBurgerSchema);
export default CustomBurger;