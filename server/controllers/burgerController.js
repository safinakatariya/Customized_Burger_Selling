import Burger from '../models/burgerModel.js';
import CustomBurger from '../models/CustomBurgerModel.js';

// Get all burgers
export const getBurgers = async (req, res) => {
  try {
    const burgers = await Burger.find();
    res.status(200).json(burgers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single burger by ID
export const getBurgerById = async (req, res) => {
  try {
    const burger = await Burger.findById(req.params.id);
    if (!burger) return res.status(404).json({ message: 'Burger not found' });
    res.status(200).json(burger);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new burger
export const createBurger = async (req, res) => {
  const { name, description, price, image } = req.body;
  const newBurger = new Burger({ name, description, price, image });

  try {
    const savedBurger = await newBurger.save();
    res.status(201).json(savedBurger);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a burger by ID
export const updateBurger = async (req, res) => {
  try {
    const updatedBurger = await Burger.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBurger) return res.status(404).json({ message: 'Burger not found' });
    res.status(200).json(updatedBurger);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a burger by ID
export const deleteBurger = async (req, res) => {
  try {
    const deletedBurger = await Burger.findByIdAndDelete(req.params.id);
    if (!deletedBurger) return res.status(404).json({ message: 'Burger not found' });
    res.status(200).json({ message: 'Burger deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new customized burger
export const createCustomBurger = async (req, res) => {
  const { name, description, price, image, ingredients, quantity } = req.body;
  const newCustomBurger = new CustomBurger({ name, description, price, image, ingredients, quantity });

  try {
    const savedCustomBurger = await newCustomBurger.save();
    res.status(201).json(savedCustomBurger);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};