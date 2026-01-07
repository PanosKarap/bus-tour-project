import React, { useState, useEffect } from "react";
import "./ResultScreen.css";
import bgImage from "../../../assets/driver/broom/broom-bg.webp";
import speedIcon from "../../../assets/driver/broom/speed.svg";
import timerIcon from "../../../assets/driver/broom/time.svg";
import spotsIcon from "../../../assets/driver/broom/spots.svg";
import checkIcon from "../../../assets/driver/broom/power-on.svg";

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
  const [stage, setStage] = useState("loading");
  const [progress, setProgress] = useState(0);
  const [foundItem, setFoundItem] = useState(null);

  useEffect(() => {
    // Υπολογισμός διάρκειας καθαρισμού με βάση την επιλογή ή default 5 δευτερόλεπτα
    const duration = parseInt(broomTime) || 5;
    const intervalTime = 50; // Κάθε 50ms ενημερώνεται η μπάρα
    const totalSteps = (duration * 1000) / intervalTime; // Συνολικά βήματα
    let currentStep = 0;

    // Έναρξη του χρονοδιακόπτη (timer)
    const timer = setInterval(() => {
      currentStep++;
      // Υπολογισμός νέου ποσοστού προόδου
      const newProgress = Math.min((currentStep / totalSteps) * 100, 100);
      setProgress(newProgress);

      // Έλεγχος αν ολοκληρώθηκε ο καθαρισμός
      if (currentStep >= totalSteps) {
        clearInterval(timer); // Σταματάμε τον χρονοδιακόπτη

        // Επιλογή τυχαίου αντικειμένου από τη λίστα POSSIBLE_ITEMS
        const randomItem =
          POSSIBLE_ITEMS[Math.floor(Math.random() * POSSIBLE_ITEMS.length)];
        setFoundItem(randomItem);
        setStage("found"); // Αλλαγή σταδίου σε "found" (βρέθηκε αντικείμενο)
      }
    }, intervalTime);

    // Καθαρισμός του timer όταν αποσυνδεθεί το component ή αλλάξει ο χρόνος
    return () => clearInterval(timer);
  }, [broomTime]);

  // Συνάρτηση χειρισμού για μετάβαση στο επόμενο στάδιο
  const handleContinue = () => {
    setStage("summary");
  };

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
      className="container driver-bg result-container"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="header-container">
        <div className="result-header-box">
          <img
            src={checkIcon}
            alt="Active"
            style={{ width: "50px", height: "50px" }}
          />
          <h2>
            {stage === "loading" && "Διαδικασία Καθαρισμού..."}
            {stage === "found" && "Βρέθηκε Αντικείμενο!"}
            {stage === "summary" && "Σύνοψη Καθαρισμού"}
          </h2>
        </div>
      </div>

      {stage === "loading" && (
        <div className="result-card">
          <h3 className="loading-title">Καθαρισμός σε εξέλιξη...</h3>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
          <span className="progress-text">{Math.round(progress)}%</span>
        </div>
      )}

      {stage === "found" && foundItem && (
        <div className="result-card">
          <h3 className="found-title">🔍 Βρέθηκε κάτι!</h3>

          <img
            src={foundItem.img}
            alt={foundItem.name}
            className="found-item-img"
          />

          <div style={{ textAlign: "center" }}>
            <div className="found-item-name">{foundItem.name}</div>
            <div
              className={`found-item-type ${
                foundItem.type === "trash" ? "type-trash" : "type-useful"
              }`}
            >
              {foundItem.label}
            </div>
          </div>

          <div className="action-buttons-container">
            <button
              className="btn-back btn-action btn-trash"
              onClick={handleContinue}
            >
              Πέταμα 🗑️
            </button>
            <button
              className="btn-back btn-action btn-keep"
              onClick={handleContinue}
            >
              Κράτημα 🎒
            </button>
          </div>
        </div>
      )}

      {stage === "summary" && (
        <div className="result-card summary-card">
          <div style={{ textAlign: "center", marginBottom: "10px" }}>
            <h3 className="summary-title">
              &#10003; Η σκούπα ολοκλήρωσε τον καθαρισμό!
            </h3>
            <p className="summary-subtitle">Ρυθμίσεις σκούπας:</p>
          </div>

          <hr className="summary-divider" />

          <div className="summary-grid">
            <div className="summary-row">
              <div className="summary-row-left">
                <img src={speedIcon} alt="Speed" className="summary-icon" />
                <span className="summary-label">Ταχύτητα:</span>
              </div>
              <span className="summary-value">{displaySpeed}</span>
            </div>

            <div className="summary-row">
              <div className="summary-row-left">
                <img src={timerIcon} alt="Time" className="summary-icon" />
                <span className="summary-label">Διάρκεια:</span>
              </div>
              <span className="summary-value">{displayTime}</span>
            </div>

            <div className="summary-row">
              <div className="summary-row-left">
                <img src={spotsIcon} alt="Spots" className="summary-icon" />
                <span className="summary-label">Περιοχή:</span>
              </div>
              <span className="summary-value">{displaySpots}</span>
            </div>
          </div>
        </div>
      )}

      {stage !== "found" && (
        <button className="btn-back result-back-btn" onClick={onBack}>
          Επιστροφή στο Μενού
        </button>
      )}
    </div>
  );
}
