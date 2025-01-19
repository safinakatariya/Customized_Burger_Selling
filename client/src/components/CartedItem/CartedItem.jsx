import React from "react";
import "./CartedItem.css";
import { useCart } from "../../context/cartContext";
import { useNavigate } from "react-router-dom";

const CartedItem = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const handleAddQuantity = (cartId) => {
    updateQuantity(cartId, cart.find((item) => item.cartId === cartId).quantity + 1);
  };

  const handleRemoveQuantity = (cartId) => {
    updateQuantity(cartId, cart.find((item) => item.cartId === cartId).quantity - 1);
  };

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.finalPrice * item.quantity, 0)
      .toFixed(2);
  };

  const handleAddMoreItems = () => {
    navigate("/Menu");
  };

  const handleProceedToPay = () => {
    console.log("Proceeding to pay:", cart);
    navigate("/PayedPage", { state: { order: cart } });
  };

  return (
    <div className="cart-page">
      <h1 className="cart-title">Your Cart</h1>
      <div className="cart-items">
        {cart.length > 0 ? (
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.cartId} className="cart-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-description">{item.description}</p>
                  <p className="cart-item-ingredients">
                    Ingredients: {item.ingredients.join(", ")}
                  </p>
                  <p className="cart-item-price">
                    Price: ${parseFloat(item.finalPrice).toFixed(2)}
                  </p>
                  <div className="cart-item-quantity">
                    <button onClick={() => handleRemoveQuantity(item.cartId)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleAddQuantity(item.cartId)}>
                      +
                    </button>
                  </div>
                  <p className="cart-item-total">
                    Total: ${(parseFloat(item.finalPrice) * item.quantity).toFixed(2)}
                  </p>
                  <button onClick={() => removeFromCart(item.cartId)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      <div className="cart-summary">
        <h3>Grand Total: ${calculateTotal()}</h3>
      </div>
      <div className="cart-actions">
        <button onClick={handleAddMoreItems}>Add More Items</button>
        <button onClick={handleProceedToPay}>Proceed to Pay</button>
      </div>
    </div>
  );
};

export default CartedItem;