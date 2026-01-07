import React from "react";
import "./SpeedScreen.css";
import bgImage from "../../../assets/driver/broom/broom-bg.webp";
import speedIcon from "../../../assets/driver/broom/speed.svg";

export default function SpeedScreen({ onBack, setBroomSpeed, broomSpeed }) {
  const options = [
    { id: "Low", label: "Χαμηλή" },
    { id: "Medium", label: "Μεσαία" },
    { id: "High", label: "Υψηλή" },
    { id: "Turbo", label: "Turbo" },
  ];

  return (
    <div
      className="container driver-bg speed-screen-container"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="header-container" style={{ marginBottom: "20px" }}>
        <div className="speed-header-box">
          <img
            src={speedIcon}
            alt="Speed"
            style={{ width: "60px", height: "60px" }}
          />
          <h2 style={{ margin: 0, fontSize: "2.5rem", color: "white" }}>
            Ρύθμιση ταχύτητας
          </h2>
        </div>
      </div>

      <div className="speed-grid">
        {options.map((option) => {
          const isSelected = broomSpeed === option.id;

          return (
            <button
              key={option.id}
              className={`btn blue speed-btn-override ${
                isSelected ? "selected" : ""
              }`}
              onClick={() => setBroomSpeed(option.id)}
            >
              <div className={`radio-container ${isSelected ? "active" : ""}`}>
                {isSelected && <div className="radio-dot" />}
              </div>

              <img
                src={speedIcon}
                className="btn-icon speed-icon"
                alt={option.label}
              />
              <span className="speed-label">{option.label}</span>
            </button>
          );
        })}
      </div>

      {/* --- FOOTER --- */}
      <div className="speed-back-container">
        <button className="btn-back speed-back-btn" onClick={onBack}>
          &larr; Επιστροφή
        </button>
      </div>
    </div>
  );
}
