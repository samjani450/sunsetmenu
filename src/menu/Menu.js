import React, { useState } from "react";
import menuapi from "./menuapi";
import MenuDetails from "./MenuDetails";
import "./style.css";

const categories = [
  { categ: "BREAKFAST" },
  { categ: "CROISSANT" },
  { categ: "SANDWICH" },
  { categ: "DESERT" },
  { categ: "COFFEE" },
  { categ: "FILTERED COFFEE" },
   {
    categ: "SUNSET & TOXIUAE",
    subcategories: [
      { name: "NOODLES" },
      { name: "SUSHI" },
      { name: "THE CONTINENTAL FOOD" },
      { name: "NOODLES AND FRIED RICE" },
    ],
  },
  { categ: "MATCHA" },
  { categ: "COLD DRINKS" },
  { categ: "JUICE & WATER" },
  { categ: "CAKE" },
  { categ: "AFTERNOON TEA" },
 
];

const Menu = () => {
  // 🔹 Default category and subcategory set to SUNSET & TOXIUAE → NOODLES
  const [selectedCategory, setSelectedCategory] = useState("SUNSET & TOXIUAE");
  const [selectedSubCategory, setSelectedSubCategory] = useState("NOODLES");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  // 🔹 Filter logic: use subcategory when available
  const filteredItems = menuapi
    .filter((item) => {
      const categoryMatch =
        item.categrory === selectedSubCategory ||
        item.categrory === selectedCategory;
      const searchMatch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return categoryMatch && searchMatch;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  if (selectedItem) {
    return (
      <MenuDetails item={selectedItem} goBack={() => setSelectedItem(null)} />
    );
  }

  return (
    <div className="menu-container">
      {/* 🔹 Header */}
      <div className="title-container">
        <img src="/images/logoe.png" alt="Logo" className="logo" />
        <h1 className="title">Sunset Coffee</h1>
      </div>

      {/* 🔹 Search Bar */}
      <input
        type="text"
        placeholder="Search for menu item"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {/* 🔹 Category Menu */}
      <div className="category-menu">
        {categories.map((cat, index) => (
          <div key={index}>
            <button
              onClick={() => {
                setSelectedCategory(cat.categ);
                if (cat.subcategories) {
                  // Automatically select first subcategory when category has subcategories
                  setSelectedSubCategory(cat.subcategories[0].name);
                } else {
                  setSelectedSubCategory(null);
                }
              }}
              className={`category-btn ${
                selectedCategory === cat.categ ? "active" : ""
              }`}
            >
              {cat.categ}
            </button>

            {/* 🔸 Subcategories (inside SUNSET & TOXIUAE) */}
            {cat.subcategories && selectedCategory === cat.categ && (
              <div className="subcategory-menu">
                {cat.subcategories.map((sub, subIndex) => (
                  <button
                    key={subIndex}
                    onClick={() => setSelectedSubCategory(sub.name)}
                    className={`subcategory-btn ${
                      selectedSubCategory === sub.name ? "active" : ""
                    }`}
                  >
                    {sub.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 🔹 Filtered Menu Items */}
      <div className="menu-grid">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, id) => (
            <div
              key={id}
              className="menu-item"
              onClick={() => setSelectedItem(item)}
            >
              <img src={item.img} alt={item.name} />
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
