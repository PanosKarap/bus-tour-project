import React from "react";
import "./OnlineHelpScreen.css";
import OnlineHelpPhoto from "../assets/home/online-help.webp";

export default function OnlineHelpScreen({ onBack }) {
  return (
    <div
      className="online-help-container"
      style={{
        backgroundImage: `url(${OnlineHelpPhoto})`,
      }}
    >
      <div className="online-help-overlay" />
      <button className="online-help-back-btn" onClick={onBack}>
        &larr; Επιστροφή
      </button>
    </div>
  );
}
