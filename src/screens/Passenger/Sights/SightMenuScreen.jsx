import React from "react";

// --- IMAGES ---
import Town1Sight1 from "../../../assets/passenger/sights/town1/Town1Sight1.png";
import Town1Sight2 from "../../../assets/passenger/sights/town1/Town1Sight2.png";
import Town1Sight3 from "../../../assets/passenger/sights/town1/Town1Sight3.png";

import Town2Sight1 from "../../../assets/passenger/sights/town2/Town2Sight1.png";
import Town2Sight2 from "../../../assets/passenger/sights/town2/Town2Sight2.png";
import Town2Sight3 from "../../../assets/passenger/sights/town2/Town2Sight3.png";

import Town3Sight1 from "../../../assets/passenger/sights/town3/Town3Sight1.png";
import Town3Sight2 from "../../../assets/passenger/sights/town3/Town3Sight2.png";
import Town3Sight3 from "../../../assets/passenger/sights/town3/Town3Sight3.png";

export default function SightsMenuScreen({
  onSelectSight,
  onBack,
  currentScenario,
}) {
  // 1. DETERMINE WHICH SIGHTS TO SHOW
  let sightsList = [
    { id: 1, image: Town1Sight1, name: "The Great Basilica" },
    { id: 2, image: Town1Sight2, name: "The Twin Towers" },
    { id: 3, image: Town1Sight3, name: "The Endless Arches" },
  ];

  if (currentScenario) {
    if (currentScenario.includes("Town2")) {
      sightsList = [
        { id: 1, image: Town2Sight1, name: "The Gothic Cathedral" },
        { id: 2, image: Town2Sight2, name: "The Lady of the Lantern" },
        { id: 3, image: Town2Sight3, name: "Mercato Centrale" },
      ];
    } else if (currentScenario.includes("Town3")) {
      sightsList = [
        { id: 1, image: Town3Sight1, name: "The Music Pavilion" },
        { id: 2, image: Town3Sight2, name: "The Ancient Amphitheater" },
        { id: 3, image: Town3Sight3, name: "The Golden Gate" },
      ];
    }
  }

  return (
    <div
      className="container home-bg"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1
        style={{
          color: "white",
          marginBottom: "20px",
          textShadow: "0 2px 4px rgba(0,0,0,0.5)",
        }}
      >
        Αξιοθέατα
      </h1>

      <div
        className="button-container"
        style={{
          display: "flex",
          gap: "25px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {sightsList.map((sight) => (
          <button
            key={sight.id}
            className="btn"
            onClick={() => onSelectSight(sight)}
            style={{
              // 1. IMAGE AS BACKGROUND
              backgroundImage: `url(${sight.image})`,
              backgroundSize: "cover",
              backgroundColor: "var(--brown)",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",

              // 2. SIZE
              width: "350px",
              height: "350px",

              // 3. LAYOUT CHANGE: Use Relative Positioning here
              position: "relative", // Needed for the absolute child
              padding: 0,
              display: "block", // Removes flex behavior to avoid layout quirks

              // 4. BORDER STYLING
              borderRadius: "15px",
              overflow: "hidden", // Clips the absolute child at the corners
              boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
              cursor: "pointer",
              border: "none", // Ensure no default border creates space
            }}
          >
            {/* Dark gradient bar at bottom */}
            <div
              style={{
                // 5. ABSOLUTE POSITIONING (Fixes the gap)
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",

                color: "white",
                padding: "10px",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "1.3rem",
                backdropFilter: "blur(3px)",
              }}
            >
              {sight.name}
            </div>
          </button>
        ))}
      </div>

      <button
        className="btn-back"
        onClick={onBack}
        style={{ marginTop: "30px" }}
      >
        &larr; Επιστροφή
      </button>
    </div>
  );
}
