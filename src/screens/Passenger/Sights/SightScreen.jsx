import React from "react";

export default function SightScreen({ sight, onBack }) {
  if (!sight) return null;

  return (
    <div
      className="container home-bg"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        color: "white",
        textAlign: "center",
      }}
    >
      {/* Title */}
      <h1
        style={{
          fontSize: "2.5rem",
          marginBottom: "30px",
          textShadow: "0 2px 4px rgba(0,0,0,0.6)",
        }}
      >
        {sight.name}
      </h1>

      <div
        style={{
          display: "flex",
          gap: "40px",
          alignItems: "center",
          maxWidth: "900px",
          backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent background for readability
          padding: "30px",
          borderRadius: "20px",
          backdropFilter: "blur(5px)",
        }}
      >
        {/* Large Image */}
        <img
          src={sight.image}
          alt={sight.name}
          style={{
            width: "400px",
            height: "300px",
            objectFit: "cover",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
          }}
        />

        {/* Description Text */}
        <div style={{ flex: 1, textAlign: "left" }}>
          <h3
            style={{
              borderBottom: "1px solid white",
              paddingBottom: "10px",
              marginBottom: "15px",
            }}
          >
            Πληροφορίες
          </h3>
          <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
            {sight.description}
          </p>
        </div>
      </div>

      {/* Back Button */}
      <button
        className="btn-back"
        onClick={onBack}
        style={{ marginTop: "40px" }}
      >
        &larr; Πίσω στη Λίστα
      </button>
    </div>
  );
}
