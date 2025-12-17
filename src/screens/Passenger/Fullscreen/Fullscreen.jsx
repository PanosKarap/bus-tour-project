import React from "react";

// --- IMAGE IMPORTS ---
import FullscreenTown1 from "../../../assets/passenger/fullscreentown/FullscreenTown1.png";
import FullscreenTown2 from "../../../assets/passenger/fullscreentown/FullscreenTown2.png";
import FullscreenTown3 from "../../../assets/passenger/fullscreentown/FullscreenTown3.png";

export default function Fullscreen({ currentScenario, onBack }) {
  let backgroundImage = FullscreenTown1;

  if (currentScenario.includes("Town2")) {
    backgroundImage = FullscreenTown2;
  } else if (currentScenario.includes("Town3")) {
    backgroundImage = FullscreenTown3;
  }

  return (
    <div
      style={{
        // 2. FORCE FULL COVERAGE
        // We use absolute positioning to cover the brown 'TabletLayout' background completely
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 100, // High z-index to sit on top of everything else

        // 3. IMAGE STYLES
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",

        // 4. FALLBACK COLOR (White instead of brown/transparent)
        backgroundColor: "white",
      }}
    >
      {/* Optional: Slight dark overlay to make the back button readable */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.1)",
        }}
      />

      {/* BACK BUTTON */}
      <button
        className="btn-back"
        onClick={onBack}
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        &larr; Επιστροφή
      </button>
    </div>
  );
}
