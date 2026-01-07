import React from "react";
import "./PowerUsageScreen.css";

export default function PowerUsageScreen({ finalPowerUsage, onBack }) {
  return (
    <div className="container driver-bg power-usage-container">
      <h1 className="power-usage-title">Κατανάλωση Ενέργειας</h1>

      <div className="power-usage-card">
        <div className="power-icon-wrapper">
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffcc00"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
          </svg>
        </div>

        <div className="power-value">{finalPowerUsage}</div>

        <div className="power-label">WATTS / ΩΡΑ</div>
      </div>

      <button className="btn-back power-back-btn" onClick={onBack}>
        &larr; Επιστροφή
      </button>
    </div>
  );
}
