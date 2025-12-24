import React from "react";
import OnlineHelpPhoto from "../assets/home/online-help.webp";

export default function OnlineHelpScreen({ onBack }) {
  let backgroundImage = OnlineHelpPhoto;

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
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",

        // 4. FALLBACK COLOR (White instead of brown/transparent)
        backgroundColor: "var(--bg-dark)",
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
