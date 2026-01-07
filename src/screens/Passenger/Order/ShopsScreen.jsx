import React from "react";
import "./ShopsScreen.css";
import { SHOPS_DATA } from "../../../data/mockData";
import bgImage from "../../../assets/passenger/order/coffee-bg.webp";

export default function ShopsScreen({ onSelectShop, onBack }) {
  return (
    <div
      className="container"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="button-container">
        {/* Μετατρέπει το SHOPS_DATA σε πίνακα και δημιουργεί ένα κουμπί για κάθε κατάστημα */}
        {Object.values(SHOPS_DATA).map((shop) => (
          <button
            key={shop.id}
            className="btn brown"
            onClick={() => onSelectShop(shop.id)}
          >
            <img src={shop.icon} className="btn-icon" alt={shop.name} />
            <span>{shop.name}</span>
          </button>
        ))}
      </div>
      <button className="btn-back" onClick={onBack}>
        &larr; Επιστροφή
      </button>
    </div>
  );
}
