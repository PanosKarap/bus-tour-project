import React from "react";
import "./SpotsScreen.css";

import bgImage from "../../../assets/driver/broom/broom-bg.webp";
import spotsIcon from "../../../assets/driver/broom/spots.svg";

export default function SpotsScreen({ onBack, setBroomSpots, broomSpots }) {
  const options = [
    { id: "back", label: "Πίσω καθίσματα" },
    { id: "mid", label: "Μεσαία καθίσματα" },
    { id: "front", label: "Μπροστινά καθίσματα" },
    { id: "all", label: "Όλα τα καθίσματα" },
  ];

  return (
    <div
      className="container driver-bg spots-screen-container"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="header-container" style={{ marginBottom: "20px" }}>
        <div className="spots-header-box">
          <img
            src={spotsIcon}
            alt="Spots"
            style={{ width: "60px", height: "60px" }}
          />
          <h2 style={{ margin: 0, fontSize: "2.5rem", color: "white" }}>
            Επιλογή περιοχών
          </h2>
        </div>
      </div>

      <div className="spots-grid">
        {options.map((option) => {
          const isSelected = broomSpots === option.id;

          return (
            <button
              key={option.id}
              className={`btn blue spots-btn-override ${
                isSelected ? "selected" : ""
              }`}
              onClick={() => setBroomSpots(option.id)}
            >
              <div className={`radio-container ${isSelected ? "active" : ""}`}>
                {isSelected && <div className="radio-dot" />}
              </div>

              <img
                src={spotsIcon}
                className="btn-icon spots-icon"
                alt={option.label}
              />
              <span className="spots-label">{option.label}</span>
            </button>
          );
        })}
      </div>

      <div className="spots-back-container">
        <button className="btn-back spots-back-btn" onClick={onBack}>
          &larr; Επιστροφή
        </button>
      </div>
    </div>
  );
}
