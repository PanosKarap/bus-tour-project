import React from "react";
import bgImage from "../../../assets/driver/broom/broom-bg.webp";
import speedIcon from "../../../assets/driver/broom/speed.svg";
import timerIcon from "../../../assets/driver/broom/time.svg";
import spotsIcon from "../../../assets/driver/broom/spots.svg";
import startIcon from "../../../assets/driver/broom/power-on.svg";

export default function BroomScreen({
  onChangeSpeed,
  onChangeTime,
  onChangeSpots,
  onStart,
  onBack,
}) {
  // Helper style objects to keep the JSX clean and consistent
  const buttonStyle = {
    height: "300px", // Reduced from 350px
    fontSize: "1.3rem", // Slightly smaller font to fit
    padding: "10px",
  };

  const iconStyle = {
    width: "80px", // Reduced from 120px
    height: "80px",
    marginBottom: "5px",
  };

  return (
    <div className="container" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="header-container">
        <h2
          className="header-title"
          style={{
            fontSize: "3rem",
            color: "white",
            fontWeight: "900",
            textAlign: "center",
            marginBottom: "30px", // Reduced margin slightly
            marginTop: "0",
            textShadow: "0 4px 10px rgba(0,0,0,0.5)",
          }}
        >
          Εφαρμογή σκούπας
        </h2>
      </div>

      <div
        className="button-container"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px", // Tighter gap
          width: "90%",
          maxWidth: "900px",
        }}
      >
        <button
          className="btn blue"
          onClick={onChangeSpeed}
          style={buttonStyle}
        >
          <img
            src={speedIcon}
            className="btn-icon"
            alt="Order"
            style={iconStyle}
          />
          <span>Ρύθμιση ταχύτητας</span>
        </button>

        <button className="btn blue" onClick={onChangeTime} style={buttonStyle}>
          <img
            src={timerIcon}
            className="btn-icon"
            alt="Order"
            style={iconStyle}
          />
          <span>Ρύθμιση χρόνου</span>
        </button>

        <button
          className="btn blue"
          onClick={onChangeSpots}
          style={buttonStyle}
        >
          <img
            src={spotsIcon}
            className="btn-icon"
            alt="Order"
            style={iconStyle}
          />
          <span>Επιλογή περιοχών</span>
        </button>

        <button className="btn blue" onClick={onStart} style={buttonStyle}>
          <img
            src={startIcon}
            className="btn-icon"
            alt="Order"
            style={iconStyle}
          />
          <span>Ενεργοποίηση</span>
        </button>
      </div>

      <button
        className="btn-back"
        onClick={onBack}
        style={{ marginTop: "30px" }} // Reduced top margin for the back button
      >
        &larr; Επιστροφή
      </button>
    </div>
  );
}
