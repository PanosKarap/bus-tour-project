import React from "react";
import "./SightScreen.css";

export default function SightScreen({ sight, onBack }) {
  if (!sight) return null;

  return (
    <div className="container home-bg sight-detail-container">
      <h1 className="sight-detail-title">{sight.name}</h1>

      <div className="sight-content-box">
        <img src={sight.image} alt={sight.name} className="sight-image" />

        <div className="sight-info">
          <h3 className="sight-info-title">Πληροφορίες</h3>
          <p className="sight-info-text">{sight.description}</p>
        </div>
      </div>

      <button className="btn-back sight-detail-back-btn" onClick={onBack}>
        &larr; Πίσω στη Λίστα
      </button>
    </div>
  );
}
