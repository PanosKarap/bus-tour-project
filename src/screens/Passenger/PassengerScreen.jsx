import React from "react";
import storeIcon from "../../assets/passenger/store.svg";
import fullscreenIcon from "../../assets/passenger/fullscreen.svg";
import sightsIcon from "../../assets/passenger/sights.svg";

export default function PassengerScreen({
  onBack,
  onFullscreen,
  onOrder,
  onSights,
}) {
  return (
    <div className="container home-bg">
      <div className="button-container">
        <button className="btn brown" onClick={onFullscreen}>
          <img src={fullscreenIcon} className="btn-icon" alt="Order" />
          <span>Πλήρης Οθόνη</span>
        </button>
        <button className="btn brown" onClick={onOrder}>
          <img src={storeIcon} className="btn-icon" alt="Order" />
          <span>Παραγγελία</span>
        </button>
        <button className="btn brown" onClick={onSights}>
          <img src={sightsIcon} className="btn-icon" alt="Order" />
          <span>Αξιοθέατα</span>
        </button>
      </div>
      <button className="btn-back" onClick={onBack}>
        &larr; Επιστροφή
      </button>
    </div>
  );
}
