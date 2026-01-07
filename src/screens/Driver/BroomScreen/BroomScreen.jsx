import React from "react";
import "./BroomScreen.css";
import bgImage from "../../../assets/driver/broom/broom-bg.webp";
import speedIcon from "../../../assets/driver/broom/speed.svg";
import timerIcon from "../../../assets/driver/broom/time.svg";
import spotsIcon from "../../../assets/driver/broom/spots.svg";
import startIcon from "../../../assets/driver/broom/power-on.svg";

export default function BroomScreen({
  onChangeSpeed,
  onChangeTime,
  onChangeSpots,
  onResultScreen,
  onBack,
}) {
  return (
    <div
      className="container driver-bg"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="broom-grid">
        <button className="btn blue broom-btn" onClick={onChangeSpeed}>
          <img src={speedIcon} className="btn-icon broom-icon" alt="Speed" />
          <span>Ρύθμιση ταχύτητας</span>
        </button>

        <button className="btn blue broom-btn" onClick={onChangeTime}>
          <img src={timerIcon} className="btn-icon broom-icon" alt="Time" />
          <span>Ρύθμιση χρόνου</span>
        </button>

        <button className="btn blue broom-btn" onClick={onChangeSpots}>
          <img src={spotsIcon} className="btn-icon broom-icon" alt="Spots" />
          <span>Επιλογή περιοχών</span>
        </button>

        <button className="btn blue broom-btn" onClick={onResultScreen}>
          <img src={startIcon} className="btn-icon broom-icon" alt="Start" />
          <span>Ενεργοποίηση</span>
        </button>
      </div>

      <button className="btn-back broom-back-btn" onClick={onBack}>
        &larr; Επιστροφή
      </button>
    </div>
  );
}
