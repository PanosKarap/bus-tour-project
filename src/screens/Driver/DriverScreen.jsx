import React from "react";
import roofIcon from "../../assets/driver/roof.svg";
import broomIcon from "../../assets/driver/broom.svg";
import powerIcon from "../../assets/driver/power.svg";

export default function DriverScreen({
  onOpenCloseRoof,
  onUseBroom,
  onViewPowerUsage,
  onBack,
}) {
  return (
    <div className="container driver-bg">
      <div className="button-container">
        <button className="btn blue" onClick={onOpenCloseRoof}>
          <img src={roofIcon} className="btn-icon" alt="Order" />
          <span>
            Άνοιγμα / Κλείσιμο <br />
            Οροφής
          </span>
        </button>
        <button className="btn blue" onClick={onUseBroom}>
          <img src={broomIcon} className="btn-icon" alt="Order" />
          <span>Έξυπνος Καθαρισμός</span>
        </button>
        <button className="btn blue" onClick={onViewPowerUsage}>
          <img src={powerIcon} className="btn-icon" alt="Order" />
          <span>Κατανάλωση ενέργειας</span>
        </button>
      </div>
      <button className="btn-back" onClick={onBack}>
        &larr; Επιστροφή
      </button>
    </div>
  );
}
