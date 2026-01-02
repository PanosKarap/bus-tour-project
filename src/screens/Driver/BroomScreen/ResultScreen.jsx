import React, { useState, useEffect } from "react";
import bgImage from "../../../assets/driver/broom/broom-bg.webp";
import speedIcon from "../../../assets/driver/broom/speed.svg";
import timerIcon from "../../../assets/driver/broom/time.svg";
import spotsIcon from "../../../assets/driver/broom/spots.svg";
import checkIcon from "../../../assets/driver/broom/power-on.svg";

export default function ResultScreen({
  broomSpeed,
  broomSpots,
  broomTime,
  onBack,
}) {
  // 1. STATE FOR LOADING ANIMATION
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // 2. SIMULATE CLEANING PROCESS
  useEffect(() => {
    // Convert selected time (string) to a number for calculation
    // Note: For demo purposes, we will treat 'minutes' as 'seconds' so you don't wait forever.
    // If you want real minutes, multiply duration by 60.
    const duration = parseInt(broomTime);
    const intervalTime = 50; // Update every 50ms
    const totalSteps = (duration * 1000) / intervalTime; // Total steps to reach 100%
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / totalSteps) * 100, 100);
      setProgress(newProgress);

      if (currentStep >= totalSteps) {
        clearInterval(timer);
        setIsLoading(false); // Finished! Show result.
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [broomTime]);

  // --- HELPER MAPS ---
  const speedLabels = {
    Low: "Χαμηλή",
    Medium: "Μεσαία",
    High: "Υψηλή",
    Turbo: "Turbo",
  };
  const timeLabels = {
    1: "1 λεπτό",
    5: "5 λεπτά",
    10: "10 λεπτά",
    20: "20 λεπτά",
  };
  const spotLabels = {
    back: "Πίσω καθίσματα",
    mid: "Μεσαία καθίσματα",
    front: "Μπροστινά καθίσματα",
    all: "Όλα τα καθίσματα",
  };

  const displaySpeed = speedLabels[broomSpeed] || broomSpeed;
  const displayTime = timeLabels[broomTime] || broomTime;
  const displaySpots = spotLabels[broomSpots] || broomSpots;

  return (
    <div
      className="container driver-bg"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* --- HEADER --- */}
      <div className="header-container" style={{ marginBottom: "30px" }}>
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
            src={checkIcon}
            alt="Active"
            style={{ width: "50px", height: "50px" }}
          />
          <h2 style={{ margin: 0, fontSize: "2rem" }}>
            {isLoading ? "Διαδικασία Καθαρισμού..." : "Σύνοψη Καθαρισμού"}
          </h2>
        </div>
      </div>

      {/* --- CONDITIONAL RENDERING --- */}
      {isLoading ? (
        /* --- LOADING STATE (PROGRESS BAR) --- */
        <div
          style={{
            background: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(12px)",
            border: "3px solid var(--bg-blue)",
            borderRadius: "20px",
            padding: "50px",
            width: "90%",
            maxWidth: "600px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <h3 style={{ color: "white", fontSize: "1.5rem" }}>
            Καθαρισμός σε εξέλιξη...
          </h3>

          {/* Progress Bar Container */}
          <div
            style={{
              width: "100%",
              height: "20px",
              background: "#333",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            {/* The Moving Bar */}
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: "#2ecc71", // Green color
                transition: "width 0.1s linear",
              }}
            />
          </div>

          <span
            style={{ color: "#2ecc71", fontWeight: "bold", fontSize: "1.2rem" }}
          >
            {Math.round(progress)}%
          </span>
        </div>
      ) : (
        /* --- SUCCESS STATE (SUMMARY CARD) --- */
        <div
          style={{
            background: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(12px)",
            border: "3px solid var(--bg-blue)",
            borderRadius: "20px",
            padding: "40px",
            width: "90%",
            maxWidth: "700px",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            animation: "popIn 0.5s ease", // Add pop animation
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "10px" }}>
            <h3 style={{ color: "#2ecc71", fontSize: "1.8rem", margin: 0 }}>
              &#10003; Η σκούπα ολοκλήρωσε τον καθαρισμό!
            </h3>
            <p style={{ color: "#ccc", fontSize: "1.2rem", marginTop: "10px" }}>
              Ρυθμίσεις σκούπας:
            </p>
          </div>

          <hr style={{ width: "100%", borderColor: "rgba(255,255,255,0.2)" }} />

          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <div style={rowStyle}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "15px" }}
              >
                <img src={speedIcon} alt="Speed" style={iconStyle} />
                <span style={labelStyle}>Ταχύτητα:</span>
              </div>
              <span style={valueStyle}>{displaySpeed}</span>
            </div>

            <div style={rowStyle}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "15px" }}
              >
                <img src={timerIcon} alt="Time" style={iconStyle} />
                <span style={labelStyle}>Διάρκεια:</span>
              </div>
              <span style={valueStyle}>{displayTime}</span>
            </div>

            <div style={rowStyle}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "15px" }}
              >
                <img src={spotsIcon} alt="Spots" style={iconStyle} />
                <span style={labelStyle}>Περιοχή:</span>
              </div>
              <span style={valueStyle}>{displaySpots}</span>
            </div>
          </div>
        </div>
      )}

      <button
        className="btn-back"
        onClick={onBack}
        style={{ marginTop: "40px" }}
      >
        Επιστροφή στο Μενού
      </button>
    </div>
  );
}

// --- STYLES ---
const rowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "rgba(255,255,255,0.1)",
  padding: "15px 20px",
  borderRadius: "15px",
  border: "1px solid rgba(255,255,255,0.1)",
};
const iconStyle = { width: "40px", height: "40px" };
const labelStyle = { color: "#ccc", fontSize: "1.3rem", fontWeight: "bold" };
const valueStyle = {
  color: "white",
  fontSize: "1.4rem",
  fontWeight: "800",
  textShadow: "0 2px 4px rgba(0,0,0,0.5)",
};
