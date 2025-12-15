import React from "react";
import storeIcon from "../../assets/passenger/store.svg";

export default function PassengerScreen({ onBack, onForward }) {
  return (
    <div className="container home-bg">
      <div className="button-container">
        <button className="btn brown" onClick={onForward}>
          <img src={storeIcon} className="btn-icon" alt="Order" />
          <span>Παραγγελία</span>
        </button>

        <button
          className="btn btn-outline"
          onClick={() => alert("Settings clicked")}
        >
          <span style={{ fontSize: "50px" }}>⚙️</span>
          <span>Άλλη λειτουργία</span>
        </button>
      </div>
      <button className="btn-back" onClick={onBack}>
        &larr; Επιστροφή
      </button>
    </div>
  );
}
