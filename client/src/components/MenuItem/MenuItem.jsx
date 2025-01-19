import React from "react";
import "./MenuItem.css";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cartContext";
import { v4 as uuidv4 } from "uuid";

// Burger Menu Data with Default Ingredients
const burgerItems = [
  {
    id: 1,
    name: "Classic Cheeseburger",
    description: "A juicy beef patty with melted cheese, lettuce, and tomato.",
    price: 8.99,
    image: assets.cheeseburger,
    ingredients: ["Beef Patty", "Cheese", "Lettuce", "Tomato"],
  },
  {
    id: 2,
    name: "BBQ Bacon Burger",
    description: "Smoky BBQ sauce, crispy bacon, and cheddar cheese.",
    price: 10.99,
    image: assets.bbqbacon,
    ingredients: ["Beef Patty", "Bacon", "Cheese", "BBQ Sauce"],
  },
  {
    id: 3,
    name: "Veggie Delight Burger",
    description: "Grilled veggie patty with fresh greens and avocado.",
    price: 7.99,
    image: assets.veggie,
    ingredients: ["Veggie Patty", "Lettuce", "Tomato", "Avocado"],
  },
  {
    id: 4,
    name: "Spicy Jalapeño Burger",
    description: "Loaded with jalapeños, pepper jack cheese, and hot sauce.",
    price: 9.99,
    image: assets.spicyJalapeño,
    ingredients: ["Beef Patty", "Jalapeños", "Pepper Jack Cheese", "Hot Sauce"],
  },
];

const MenuItem = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  //Handle Adding Items to Cart
  const handleAddToCart = (burger) => {
    const burgerWithId = {
      ...burger,
      cartId: uuidv4(),
      finalPrice: burger.price,
      quantity: 1,
    };

    addToCart(burgerWithId); // Add to global cart
    console.log(`${burger.name} added to cart!`);
    navigate("/Cart");
  };

  //Handle Customizing Items
  const handleCustomize = (burger) => {
    console.log(`Customizing ${burger.name}`);
    navigate("/Customizer", { state: { burger } });
  };

  return (
    <div className="menu-page">
      <h1 className="menu-title">Our Burger Menu</h1>
      <div className="menu-items">
        {burgerItems.map((burger) => (
          <div key={burger.id} className="menu-item">
            <img
              src={burger.image}
              alt={burger.name}
              className="menu-item-image"
            />
            <h3 className="menu-item-name">{burger.name}</h3>
            <p className="menu-item-description">{burger.description}</p>
            <p className="menu-item-price">${burger.price.toFixed(2)}</p>
            <div className="menu-item-ingredients">
              <h4>Ingredients:</h4>
              <ul>
                {burger.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div className="menu-item-actions">
              <button
                className="menu-item-button"
                onClick={() => handleAddToCart(burger)}
              >
                Add to Cart
              </button>
              <button
                className="menu-item-button"
                onClick={() => handleCustomize(burger)}
              >
                Customize
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuItem;
