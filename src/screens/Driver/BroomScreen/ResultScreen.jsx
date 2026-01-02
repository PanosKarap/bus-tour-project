import React, { useState, useEffect } from "react";
import bgImage from "../../../assets/driver/broom/broom-bg.webp";
import speedIcon from "../../../assets/driver/broom/speed.svg";
import timerIcon from "../../../assets/driver/broom/time.svg";
import spotsIcon from "../../../assets/driver/broom/spots.svg";
import checkIcon from "../../../assets/driver/broom/power-on.svg";

// --- 1. MOCK DATA: Items the broom might find ---
const POSSIBLE_ITEMS = [
  {
    id: 1,
    name: "Χαμένο Πορτοφόλι",
    type: "useful",
    label: "Χρήσιμο",
    img: "https://img.icons8.com/color/96/wallet.png",
  },
  {
    id: 2,
    name: "Παλιά Εφημερίδα",
    type: "trash",
    label: "Σκουπίδι",
    img: "https://img.icons8.com/fluency/48/newspaper-.png",
  },
  {
    id: 3,
    name: "Κέρματα (2€)",
    type: "useful",
    label: "Χρήσιμο",
    img: "https://img.icons8.com/color/96/coins.png",
  },
  {
    id: 4,
    name: "Άδειο Μπουκάλι",
    type: "trash",
    label: "Σκουπίδι",
    img: "https://img.icons8.com/color/48/bottle-of-water.png",
  },
  {
    id: 5,
    name: "Ξεχασμένα Κλειδιά",
    type: "useful",
    label: "Χρήσιμο",
    img: "https://img.icons8.com/color/96/keys-holder.png",
  },
];

export default function ResultScreen({
  broomSpeed,
  broomSpots,
  broomTime,
  onBack,
}) {
  // 1. STATE FOR LOADING ANIMATION & FOUND ITEM
  const [stage, setStage] = useState("loading"); // 'loading' -> 'found' -> 'summary'
  const [progress, setProgress] = useState(0);
  const [foundItem, setFoundItem] = useState(null);

  // 2. SIMULATE CLEANING PROCESS
  useEffect(() => {
    const duration = parseInt(broomTime) || 5;
    const intervalTime = 50;
    const totalSteps = (duration * 1000) / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / totalSteps) * 100, 100);
      setProgress(newProgress);

      if (currentStep >= totalSteps) {
        clearInterval(timer);

        // --- LOGIC: Pick a random item ---
        const randomItem =
          POSSIBLE_ITEMS[Math.floor(Math.random() * POSSIBLE_ITEMS.length)];
        setFoundItem(randomItem);
        setStage("found"); // Go to Found stage instead of finished directly
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [broomTime]);

  // --- HANDLER TO MOVE TO SUMMARY ---
  const handleContinue = () => {
    setStage("summary");
  };

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
            {stage === "loading" && "Διαδικασία Καθαρισμού..."}
            {stage === "found" && "Βρέθηκε Αντικείμενο!"}
            {stage === "summary" && "Σύνοψη Καθαρισμού"}
          </h2>
        </div>
      </div>

      {/* --- CONDITIONAL RENDERING --- */}

      {/* 1. LOADING STAGE */}
      {stage === "loading" && (
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
          <div
            style={{
              width: "100%",
              height: "20px",
              background: "#333",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: "#2ecc71",
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
      )}

      {/* 2. FOUND ITEM STAGE (NEW PART) */}
      {stage === "found" && foundItem && (
        <div
          style={{
            background: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(12px)",
            border: "3px solid var(--bg-blue)",
            borderRadius: "20px",
            padding: "40px",
            width: "90%",
            maxWidth: "600px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            animation: "popIn 0.5s ease",
          }}
        >
          <h3 style={{ color: "#f1c40f", fontSize: "1.8rem", margin: 0 }}>
            🔍 Βρέθηκε κάτι!
          </h3>

          <img
            src={foundItem.img}
            alt={foundItem.name}
            style={{
              width: "120px",
              height: "120px",
              objectFit: "contain",
              filter: "drop-shadow(0 0 10px rgba(255,255,255,0.5))",
            }}
          />

          <div style={{ textAlign: "center" }}>
            <div
              style={{ color: "white", fontSize: "1.6rem", fontWeight: "bold" }}
            >
              {foundItem.name}
            </div>
            <div
              style={{
                color: foundItem.type === "trash" ? "#e74c3c" : "#2ecc71",
                fontSize: "1.2rem",
                marginTop: "5px",
                fontWeight: "bold",
              }}
            >
              {foundItem.label}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "20px",
              width: "100%",
              marginTop: "10px",
            }}
          >
            <button
              className="btn-back"
              onClick={handleContinue}
              style={{
                flex: 1,
                marginTop: 0,
                background: "#c0392b",
                border: "none",
                fontSize: "1.1rem",
              }}
            >
              Πέταμα 🗑️
            </button>
            <button
              className="btn-back"
              onClick={handleContinue}
              style={{
                flex: 1,
                marginTop: 0,
                background: "#27ae60",
                border: "none",
                fontSize: "1.1rem",
              }}
            >
              Κράτημα 🎒
            </button>
          </div>
        </div>
      )}

      {/* 3. SUMMARY STAGE (YOUR ORIGINAL SUCCESS CARD) */}
      {stage === "summary" && (
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
            animation: "popIn 0.5s ease",
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

      {/* --- FOOTER BUTTON (Only show in Summary) --- */}
      {stage !== "found" && (
        <button
          className="btn-back"
          onClick={onBack}
          style={{ marginTop: "40px" }}
        >
          Επιστροφή στο Μενού
        </button>
      )}
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
  gap: "20px", // Keeps spacing safe
};
const iconStyle = { width: "40px", height: "40px" };
const labelStyle = { color: "#ccc", fontSize: "1.3rem", fontWeight: "bold" };
const valueStyle = {
  color: "white",
  fontSize: "1.4rem",
  fontWeight: "800",
  textShadow: "0 2px 4px rgba(0,0,0,0.5)",
  textAlign: "right",
};
