import React, { useState, useEffect } from "react";
import "./Ingredients.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cartContext"; // Import useCart

// Common Burger Ingredients
const commonIngredients = [
  { id: 1, name: "Lettuce", price: 0.5 },
  { id: 2, name: "Tomato", price: 0.75 },
  { id: 3, name: "Cheese", price: 1.0 },
  { id: 4, name: "Beef Patty", price: 2.5 },
  { id: 5, name: "Bacon", price: 1.5 },
  { id: 6, name: "Pickles", price: 0.5 },
  { id: 7, name: "Onions", price: 0.4 },
  { id: 8, name: "Jalapeños", price: 0.6 },
];

// Default burger ingredient mappings
const burgerIngredientMap = {
  "Classic Cheeseburger": [1, 2, 3, 4],
  "BBQ Bacon Burger": [4, 5, 3],
  "Veggie Delight Burger": [1, 2, 3],
  "Spicy Jalapeño Burger": [4, 8, 3],
};

const Ingredients = ({ initialBurger }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart(); // Use addToCart from CartContext

  // State for tracking ingredient quantities
  const [selectedIngredients, setSelectedIngredients] = useState({});
  const [burgerDetails, setBurgerDetails] = useState(initialBurger || {});

  useEffect(() => {
    if (initialBurger) {
      // Pre-fill selected ingredients based on burger type
      const selected = {};
      const ingredientIds = burgerIngredientMap[initialBurger.name] || [];
      ingredientIds.forEach((id) => {
        selected[id] = (selected[id] || 0) + 1; // Default quantity is 1
      });
      setSelectedIngredients(selected);
    }
  }, [initialBurger]);

  // Handle Adding Ingredients
  const handleAdd = (ingredient) => {
    setSelectedIngredients((prev) => ({
      ...prev,
      [ingredient.id]: (prev[ingredient.id] || 0) + 1,
    }));
  };

  // Handle Removing Ingredients
  const handleRemove = (ingredient) => {
    setSelectedIngredients((prev) => {
      if (!prev[ingredient.id]) return prev;
      const updated = { ...prev };
      updated[ingredient.id] -= 1;
      if (updated[ingredient.id] <= 0) {
        delete updated[ingredient.id];
      }
      return updated;
    });
  };

  // Calculate Total Price
  const calculateTotal = () => {
    const basePrice = burgerDetails?.price || 0;
    const ingredientTotal = commonIngredients.reduce((total, ingredient) => {
      const count = selectedIngredients[ingredient.id] || 0;
      return total + count * ingredient.price;
    }, 0);
    return (basePrice + ingredientTotal).toFixed(2);
  };

  // Handle Add to Cart
  const handleAddToCart = async () => {
    const ingredientsArray = Object.keys(selectedIngredients).reduce((arr, id) => {
      const ingredient = commonIngredients.find((ing) => ing.id === parseInt(id));
      if (ingredient) {
        for (let i = 0; i < selectedIngredients[id]; i++) {
          arr.push(ingredient.name);
        }
      }
      return arr;
    }, []);

    const customizedBurger = {
      ...burgerDetails,
      ingredients: ingredientsArray,
      quantity: 1, // Default quantity
      finalPrice: parseFloat(calculateTotal()), // Ensure finalPrice is a number
    };

    try {
      const response = await axios.post("http://localhost:5000/api/burgers/custom", customizedBurger);
      console.log("Custom Burger Saved:", response.data);
      addToCart({ ...response.data, finalPrice: customizedBurger.finalPrice }); // Add the saved custom burger to the cart with the final price
      navigate("/Cart");
    } catch (error) {
      console.error("Error saving custom burger:", error.response?.data?.message || error.message);
    }
  };

  // Handle Buy Now
  const handleBuyNow = async () => {
    const ingredientsArray = Object.keys(selectedIngredients).reduce((arr, id) => {
      const ingredient = commonIngredients.find((ing) => ing.id === parseInt(id));
      if (ingredient) {
        for (let i = 0; i < selectedIngredients[id]; i++) {
          arr.push(ingredient.name);
        }
      }
      return arr;
    }, []);

    const customizedBurger = {
      ...burgerDetails,
      ingredients: ingredientsArray,
      quantity: 1, // Default quantity
      finalPrice: parseFloat(calculateTotal()), // Ensure finalPrice is a number
    };

    try {
      const response = await axios.post("http://localhost:5000/api/burgers/custom", customizedBurger);
      console.log("Proceeding to checkout with:", response.data);
      navigate("/PayedPage", { state: { order: [{ ...response.data, finalPrice: customizedBurger.finalPrice }] } });
    } catch (error) {
      console.error("Error saving custom burger:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="ingredients-page">
      <h1 className="ingredients-title">
        Customize Your {burgerDetails?.name || "Burger"}
      </h1>
      <div className="customizer-container">
        {/* Left Side: Ingredient List */}
        <div className="customizer-left">
          <h3>Available Ingredients</h3>
          <div className="ingredients-list">
            {commonIngredients.map((ingredient) => (
              <div key={ingredient.id} className="ingredient-item">
                <h4>{ingredient.name}</h4>
                <p>Price: ${ingredient.price.toFixed(2)}</p>
                <div className="ingredient-controls">
                  <button onClick={() => handleRemove(ingredient)}>-</button>
                  <span>{selectedIngredients[ingredient.id] || 0}</span>
                  <button onClick={() => handleAdd(ingredient)}>+</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Burger Summary */}
        <div className="customizer-right">
          <h3>{burgerDetails?.name || "Custom Burger"}</h3>
          <p>{burgerDetails?.description || "Customize your burger to perfection!"}</p>
          <div className="ingredients-total">
            <h4>Base Price: ${burgerDetails?.price?.toFixed(2) || "0.00"}</h4>
            <h4>Total Price: ${calculateTotal()}</h4>
          </div>
          <div className="action-buttons">
            <button onClick={handleBuyNow} className="buy-now-btn">
              Buy Now
            </button>
            <button onClick={handleAddToCart} className="add-to-cart-btn">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ingredients;