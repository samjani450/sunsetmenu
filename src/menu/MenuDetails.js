import React, { useState } from "react";
import "./style.css";

const MenuDetails = ({ item, goBack }) => {
  // Set initial quantity to 1 and calculate initial total price
  const [quantity, setQuantity] = useState(1);
  
  // Handle increasing quantity
  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
  };

  // Handle decreasing quantity
  const decreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
    }
  };

  const totalPrice = item.price * quantity; // Calculate total price based on quantity

  return (
    <div className="menu-details-container">
      <div className="details-image">
        <img src={item.img} alt={item.name} className="details-img" />
      </div>
      <div className="details-content">
        <h2 className="details-title">{item.name}</h2>
        
        {/* Fixed Price Display */}
        <p className="details-price">Price per item: {item.price.toFixed(2)}</p>

        {/* Total Price based on Quantity */}
        <p className="details-total-price">
          Total: {totalPrice.toFixed(2)} {/* Show total price with 2 decimal places */}
        </p>

        <p className="details-description">{item.desc}</p>

        {/* Quantity selector with + and - buttons */}
        <div className="quantity-container">
          <label htmlFor="quantity">Quantity: </label>
          <button onClick={decreaseQuantity} className="quantity-btn">-</button>
          <span className="quantity-value">{quantity}</span>
          <button onClick={increaseQuantity} className="quantity-btn">+</button>
        </div>
      </div>

      {/* 🔴 Fixed Back Button */}
      <button onClick={goBack} className="back-button">
        ⬅ Back to Menu
      </button>
    </div>
  );
};

export default MenuDetails;
