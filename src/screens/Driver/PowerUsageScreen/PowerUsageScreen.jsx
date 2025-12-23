import React from "react";

export default function PowerUsageScreen({ finalPowerUsage, onBack }) {
  return (
    <div
      className="container driver-bg"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Title - Matching DriverScreen Header */}
      <h1
        style={{
          color: "white",
          marginBottom: "40px",
          textShadow: "0 2px 4px rgba(0,0,0,0.5)",
          fontSize: "3rem",
          fontWeight: "800",
          letterSpacing: "1px",
        }}
      >
        Κατανάλωση Ενέργειας
      </h1>

      {/* Main Display Card - Styled like your .header-box / glass effect */}
      <div
        style={{
          background: "rgba(0, 0, 0, 0.4)", // Slightly darker for contrast
          backdropFilter: "blur(12px)",
          border: "4px solid var(--bg-blue)", // Using your CSS variable
          borderRadius: "30px",
          padding: "60px 80px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: "0 12px 30px rgba(0, 0, 0, 0.5)",
          minWidth: "400px",
        }}
      >
        {/* Animated/Glow Icon */}
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: "50%",
            padding: "30px",
            marginBottom: "30px",
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.1)",
          }}
        >
          {/* Inline SVG Lightning Bolt */}
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffcc00" // Electric Yellow
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
          </svg>
        </div>

        {/* The Value */}
        <div
          style={{
            fontSize: "5rem",
            fontWeight: "bold",
            color: "white",
            lineHeight: "1",
            marginBottom: "10px",
            textShadow: "0 0 15px rgba(65, 91, 116, 0.8)", // Blue glow matching driver theme
          }}
        >
          {finalPowerUsage}
        </div>

        {/* Unit Label */}
        <div
          style={{
            fontSize: "1.5rem",
            color: "#ccc",
            fontWeight: "500",
            letterSpacing: "1px",
          }}
        >
          WATTS / ΩΡΑ
        </div>
      </div>

      {/* Back Button - Same as DriverScreen */}
      <button
        className="btn-back"
        onClick={onBack}
        style={{ marginTop: "60px" }}
      >
        &larr; Επιστροφή
      </button>
    </div>
  );
}
