import React, { useState, useEffect } from "react";
import menuapi from "./menuapi";
import MenuDetails from "./MenuDetails";
import "./style.css";

const categories = [
  { en: "BREAKFAST", ar: "فطور" },
  { en: "CROISSANT", ar: "كرواسون" },
  { en: "SANDWICH", ar: "ساندويتش" },
  { en: "DESERT", ar: "حلويات" },
  { en: "COFFEE", ar: "قهوة" },
  { en: "FILTERED COFFEE", ar: "قهوة مفلترة" },
  { en: "MATCHA", ar: "ماتشا" },
  { en: "COLD DRINKS", ar: "مشروبات باردة" },
  { en: "JUICE & WATER", ar: "عصائر ومياه" },
  { en: "CAKE", ar: "كيك" },
  { en: "AFTERNOON TEA", ar: "شاي العصر" },
];

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("BREAKFAST");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  // 🌙 Theme - DEFAULT LIGHT
  const [theme, setTheme] = useState("light");

  // 🌍 Language - DEFAULT ENGLISH
  const [lang, setLang] = useState("en");

  // ✅ Load saved preferences OR use defaults
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";  // 👈 Default light
    const savedLang = localStorage.getItem("lang") || "en";       // 👈 Default English

    setTheme(savedTheme);
    setLang(savedLang);
  }, []);

  // ✅ Save to localStorage
  useEffect(() => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("lang", lang);
  }, [theme, lang]);

  const filteredItems = menuapi
    .filter(
      (item) =>
        selectedCategory === item.categrory &&
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  if (selectedItem) {
    return (
      <MenuDetails
        item={selectedItem}
        goBack={() => setSelectedItem(null)}
      />
    );
  }

  return (
    <div
      className={`menu-container ${theme}`}
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      {/* 🔹 Header */}
      <div className="title-container">
        <img src="/images/logoe.png" alt="Logo" className="logo" />
        <h1 className="title">
          {lang === "en" ? "Sunset Coffee" : "مقهى الغروب"}
        </h1>

        {/* 🌙 Theme Button */}
        <button
          className="theme-toggle"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        {/* 🌍 Language Button - ARB */}
        <button
          className="lang-toggle"
          onClick={() => setLang(lang === "en" ? "ar" : "en")}
        >
          {lang === "en" ? "ARB" : "EN"}  {/* ✅ ARB Added */}
        </button>
      </div>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder={
          lang === "en"
            ? "Search for menu item"
            : "ابحث عن عنصر"
        }
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {/* 🔹 Categories */}
      <div className="category-menu">
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(cat.en)}
            className={`category-btn ${
              selectedCategory === cat.en ? "active" : ""
            }`}
          >
            {lang === "en" ? cat.en : cat.ar}
          </button>
        ))}
      </div>

      {/* 🔹 Items */}
      <div className="menu-grid">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, id) => {
            const price = parseFloat(item.price);
            const vat = price * 0.05;
            const finalPrice = price + vat;

            return (
              <div
                key={id}
                className="menu-item"
              
              >
                <img src={item.img} alt={item.name} />
                
                <div className="menu-item-content">
                  <p className="menu-name">
                    {lang === "en"
                      ? item.name
                      : item.name_ar || item.name}
                  </p>
                  <p className="menu-price">
                    {finalPrice.toFixed(2)}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="no-items">
            {lang === "en"
              ? "No items found"
              : "لا توجد عناصر"}
          </p>
        )}
      </div>
    </div>
  );
};

export default Menu;