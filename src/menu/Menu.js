import React, { useState } from "react";
import menuapi from "./menuapi";
import MenuDetails from "./MenuDetails"; // Import Menu Details
import "./style.css";

const categories = [
  { categ: "BREAKFAST" },
  { categ: "CROISSANT" },
  { categ: "SANDWICH" },
  { categ: "DESERT" },
  { categ: "COFFEE" },
  { categ: "FILTERED COFFEE"},
  { categ: "MATCHA" },
  { categ: "COLD DRINKS" },
  { categ: "JUICE & WATER" },
  { categ: "CAKE" },
  { categ: "AFTERNOON TEA" },
 
];

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("BREAKFAST");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = menuapi.filter(
    (item) =>
      (selectedCategory === item.categrory) && 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .sort((a, b) => a.name.localeCompare(b.name))
  if (selectedItem) {
    return <MenuDetails item={selectedItem} goBack={() => setSelectedItem(null)} />;
  }

  return (
    <div className="menu-container">

      <div className="title-container">
        <img src="/images/logoe.png" alt="Logo" className="logo" />
        <h1 className="title">Sunset Coffee</h1>
      </div>
      <input
        type="text"
        placeholder="Search for menu item"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      <div className="category-menu">
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(cat.categ)}
            className={`category-btn ${selectedCategory === cat.categ ? "active" : ""}`}
          >
            {cat.categ}
          </button>
        ))}
      </div>

      {/* Filtered Items */}
      <div className="menu-grid">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, id) => (
            <div key={id} className="menu-item">
              <img src={item.img} alt={item.name} className="menu-img" /> {/* 🖼️ Show Image */}
              <p className="menu-name">{item.name}</p>
              <p className="menu-price">{item.price}</p>
            </div>
          ))
        ) : (
          <p className="no-items">No items found</p>
        )}
      </div>
    </div>
  );
};

export default Menu;