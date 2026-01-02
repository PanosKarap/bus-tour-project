import React from "react";
import bgImage from "../../../assets/driver/broom/broom-bg.webp";
import speedIcon from "../../../assets/driver/broom/speed.svg";

export default function SpeedScreen({
  onBack,
  setBroomSpeed,
  broomSpeed, // We use this prop directly to check what is selected
}) {
  const options = [
    { id: "Low", label: "Χαμηλή" },
    { id: "Medium", label: "Μεσαία" },
    { id: "High", label: "Υψηλή" },
    { id: "Turbo", label: "Turbo" },
  ];

  // Helper styles to match BroomScreen
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    width: "90%",
    maxWidth: "900px",
    marginTop: "20px",
  };

  return (
    <div
      className="container driver-bg"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* --- HEADER --- */}
      <div className="header-container" style={{ marginBottom: "20px" }}>
        <div
          className="header-box"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            borderColor: "var(--bg-blue)",
            padding: "15px 40px",
          }}
        >
          <img
            src={speedIcon}
            alt="Speed"
            style={{ width: "60px", height: "60px" }}
          />
          <h2 style={{ margin: 0, fontSize: "2.5rem" }}>Ρύθμιση ταχύτητας</h2>
        </div>
      </div>

      {/* --- 2x2 GRID OF BUTTONS --- */}
      <div className="button-container" style={gridStyle}>
        {options.map((option) => {
          // Check selection directly against the prop
          const isSelected = broomSpeed === option.id;

          return (
            <button
              key={option.id}
              className="btn blue"
              // Update parent state immediately on click
              onClick={() => setBroomSpeed(option.id)}
              style={{
                height: "200px",
                border: isSelected ? "4px solid white" : "none", // Highlight selection
                position: "relative",
                transition: "all 0.2s",
              }}
            >
              {/* Radio Indicator Circle */}
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  border: "3px solid white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: isSelected ? "white" : "transparent",
                }}
              >
                {isSelected && (
                  <div
                    style={{
                      width: "14px",
                      height: "14px",
                      borderRadius: "50%",
                      background: "var(--bg-blue)",
                    }}
                  />
                )}
              </div>

              {/* Icon & Label */}
              <img
                src={speedIcon}
                className="btn-icon"
                alt={option.label}
                style={{ width: "80px", height: "80px", marginBottom: "10px" }}
              />
              <span style={{ fontSize: "1.5rem" }}>{option.label}</span>
            </button>
          );
        })}
      </div>

      {/* --- FOOTER BUTTONS --- */}
      <div
        style={{
          marginTop: "40px",
          display: "flex",
          gap: "20px",
          width: "90%",
          maxWidth: "600px",
        }}
      >
        {/* Return Button */}
        <button
          className="btn-back"
          onClick={onBack}
          style={{
            marginTop: 0,
            background: "rgba(0,0,0,0.6)",
            flex: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          &larr; Επιστροφή
        </button>
      </div>
    </div>
  );
}
