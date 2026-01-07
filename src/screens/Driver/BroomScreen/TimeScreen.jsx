import React from "react";
import "./TimeScreen.css";

import bgImage from "../../../assets/driver/broom/broom-bg.webp";
import timerIcon from "../../../assets/driver/broom/time.svg";

export default function TimeScreen({ onBack, setBroomTime, broomTime }) {
  const options = [
    { id: 1, label: "1 λεπτό" },
    { id: 5, label: "5 λεπτά" },
    { id: 10, label: "10 λεπτά" },
    { id: 20, label: "20 λεπτά" },
  ];

  return (
    <div
      className="container driver-bg time-screen-container"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="header-container" style={{ marginBottom: "20px" }}>
        <div className="time-header-box">
          <img
            src={timerIcon}
            alt="Time"
            style={{ width: "60px", height: "60px" }}
          />
          <h2 style={{ margin: 0, fontSize: "2.5rem", color: "white" }}>
            Ρύθμιση χρόνου
          </h2>
        </div>
      </div>

      <div className="time-grid">
        {options.map((option) => {
          const isSelected = broomTime === option.id;

          return (
            <button
              key={option.id}
              className={`btn blue time-btn-override ${
                isSelected ? "selected" : ""
              }`}
              onClick={() => setBroomTime(option.id)}
            >
              <div className={`radio-container ${isSelected ? "active" : ""}`}>
                {isSelected && <div className="radio-dot" />}
              </div>

              <img
                src={timerIcon}
                className="btn-icon time-icon"
                alt={option.label}
              />
              <span className="time-label">{option.label}</span>
            </button>
          );
        })}
      </div>

      <div className="time-back-container">
        <button className="btn-back time-back-btn" onClick={onBack}>
          &larr; Επιστροφή
        </button>
      </div>
    </div>
  );
}
