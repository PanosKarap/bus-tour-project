import React from "react";
import "./Fullscreen.css";

import FullscreenTown1 from "../../../assets/passenger/fullscreentown/FullscreenTown1.webp";
import FullscreenTown2 from "../../../assets/passenger/fullscreentown/FullscreenTown2.webp";
import FullscreenTown3 from "../../../assets/passenger/fullscreentown/FullscreenTown3.webp";

export default function Fullscreen({ currentScenario, onBack }) {
  let backgroundImage = FullscreenTown1;

  if (currentScenario.includes("Town2")) {
    backgroundImage = FullscreenTown2;
  } else if (currentScenario.includes("Town3")) {
    backgroundImage = FullscreenTown3;
  }

  return (
    <div
      className="fullscreen-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="fullscreen-overlay" />

      <button className="btn-back fullscreen-back-btn" onClick={onBack}>
        &larr; Επιστροφή
      </button>
    </div>
  );
}
