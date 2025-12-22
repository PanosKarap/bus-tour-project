import React, { useState } from "react";
import { CATEGORIES, SHOPS_DATA } from "../../../data/mockData";
import bgImage from "../../../assets/passenger/order/coffee-bg.webp";
import Modal from "../../../components/Modal";

export default function MenuScreen({
  shopId,
  cartCount,
  onAddToCart,
  onBack,
  onOpenCart,
}) {
  const [activeCategory, setActiveCategory] = useState("coffee"); // Κρατάει το id της ενεργής επιλεγμένης κατηγορίας
  const [selectedItem, setSelectedItem] = useState(null); // Κρατάει το προϊόν έχει επιλεχθεί για customization
  const [currentOptions, setCurrentOptions] = useState({}); // Αντικείμενο που κρατάει τις τρέχουσες επιλογές προσαρμογής για το επιλεγμένο προϊόν

  const shopData = SHOPS_DATA[shopId]; // Δεδομένα του επιλεγμένου καταστήματος

  // Ενημερώνει το επιλεγμένο προϊόν και αρχικοποιεί τις προεπιλεγμένες επιλογές
  const handleItemClick = (item) => {
    setSelectedItem(item);

    // Αρχικοποίηση προεπιλεγμένων επιλογών
    const defaults = {};
    if (item.options) {
      item.options.forEach((opt) => (defaults[opt.label] = opt.choices[0]));
    }
    setCurrentOptions(defaults);
  };

  const handleAddToCart = () => {
    onAddToCart(selectedItem, currentOptions);
    setSelectedItem(null);
  };

  return (
    <div
      className="container menu-mode"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Πάνω μπάρα */}
      <div className="menu-top-bar">
        {/* Όνομα Καταστήματος */}
        <div className="shop-title">{shopData.name}</div>

        {/* Κουμπί καλαθιού */}
        <div
          className="cart-badge"
          onClick={onOpenCart}
          style={{ cursor: "pointer" }}
        >
          🛒 {cartCount}
        </div>
      </div>

      {/* Κατηγορίες */}
      <div className="category-scroll">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`cat-btn ${activeCategory === cat.id ? "active" : ""}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            <img
              src={cat.icon}
              alt={cat.name}
              style={{ width: "30px", height: "30px", objectFit: "contain" }}
            />
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Grid αντικειμένων */}
      <div className="items-grid">
        {shopData.items[activeCategory]?.map((item) => (
          <div
            key={item.id}
            className="item-card"
            onClick={() => handleItemClick(item)}
          >
            <img src={item.image} alt={item.name} className="item-image" />
            <div className="item-info">
              <div className="item-name">{item.name}</div>
              <div className="item-desc">{item.desc}</div>
              <div className="item-price">{item.price}</div>
            </div>
          </div>
        ))}
        {(!shopData.items[activeCategory] ||
          shopData.items[activeCategory].length === 0) && (
          <div
            style={{ color: "white", gridColumn: "1/-1", textAlign: "center" }}
          >
            Δεν υπάρχουν προϊόντα.
          </div>
        )}
      </div>

      <button className="btn-back" style={{ marginTop: 0 }} onClick={onBack}>
        &larr; Αλλαγή Καταστήματος
      </button>

      {/* Τρέχει όταν γίνει κλικ σε κάποιο αντικείμενο */}
      {selectedItem && (
        <Modal onClose={() => setSelectedItem(null)}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <img
              src={selectedItem.image}
              style={{ width: "60px", height: "60px" }}
              alt=""
            />
            <h2>{selectedItem.name}</h2>
          </div>

          <p
            style={{ color: "#C8936A", fontWeight: "bold", fontSize: "1.2rem" }}
          >
            {selectedItem.price}
          </p>

          {/* Εμφάνιση των επιλογών προσαρμογής για το προϊόν: */}
          <div className="options-list">
            {selectedItem.options?.length > 0 ? (
              selectedItem.options.map((opt, i) => (
                <div key={i} className="option-row">
                  <span>{opt.label}</span>
                  <select
                    value={currentOptions[opt.label]}
                    onChange={(e) =>
                      // Διατήρηση των υπόλοιπων επιλογών και ενημέρωση της συγκεκριμένης επιλογής
                      setCurrentOptions({
                        ...currentOptions,
                        [opt.label]: e.target.value,
                      })
                    }
                  >
                    {/* Εμφάνιση των επιλογών για το συγκεκριμένο προϊόν σε dropdown */}
                    {opt.choices.map((c, idx) => (
                      <option key={idx} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              ))
            ) : (
              <p style={{ fontStyle: "italic", color: "#666" }}>
                Δεν υπάρχουν επιλογές.
              </p>
            )}
          </div>

          <div className="modal-actions">
            <button
              className="btn-cancel"
              onClick={() => setSelectedItem(null)}
            >
              Ακύρωση
            </button>
            <button className="btn-add" onClick={handleAddToCart}>
              Προσθήκη
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
