import React, { useState } from "react";
import "./PayedPage.css";
import { useNavigate, useLocation } from "react-router-dom";

const PayedPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showReceipt, setShowReceipt] = useState(false);

  const order = location.state?.order || [];

  const handleConfirm = () => {
    setShowReceipt(true);
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  const calculateTotal = () => {
    return order
      .reduce((total, item) => total + item.finalPrice * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="payed-page">
      {!showReceipt ? (
        <div className="order-details">
          <h1>Order Confirmation</h1>
          <ul className="order-list">
            {order.map((item) => (
              <li key={item.cartId} className="order-item">
                <h3>{item.name}</h3>
                <p>Ingredients: {item.ingredients.join(", ")}</p>
                <p>Price: ${item.finalPrice ? parseFloat(item.finalPrice).toFixed(2) : "0.00"}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Total: ${item.finalPrice ? (parseFloat(item.finalPrice) * item.quantity).toFixed(2) : "0.00"}</p>
              </li>
            ))}
          </ul>
          <h3>Grand Total: ${calculateTotal()}</h3>
          <button onClick={handleConfirm} className="confirm-button">
            Confirm Order
          </button>
        </div>
      ) : (
        <div className="receipt">
          <h1>Receipt</h1>
          <ul className="receipt-list">
            {order.map((item) => (
              <li key={item.cartId} className="receipt-item">
                <h3>{item.name}</h3>
                <p>Ingredients: {item.ingredients.join(", ")}</p>
                <p>Price: ${item.finalPrice ? parseFloat(item.finalPrice).toFixed(2) : "0.00"}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Total: ${item.finalPrice ? (parseFloat(item.finalPrice) * item.quantity).toFixed(2) : "0.00"}</p>
              </li>
            ))}
          </ul>
          <h3>Grand Total: ${calculateTotal()}</h3>
          <p>Thank you for your order! Redirecting to home...</p>
        </div>
      )}
    </div>
  );
};

export default PayedPage;