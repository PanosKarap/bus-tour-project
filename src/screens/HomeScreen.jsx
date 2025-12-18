import React, { useState } from "react";
import monitorImage from "../assets/passenger/passenger-screen.png";
import inactiveColdScreenImage from "../assets/home/inactive-temp-cold-screen.svg";
import inactiveHotScreenImage from "../assets/home/inactive-temp-hot-screen.svg";
import activeColdScreenImage from "../assets/home/active-temp-cold-screen.svg";
import activeHotScreenImage from "../assets/home/active-temp-hot-screen.svg";
import bagImage from "../assets/home/bag.svg";
import mapImage from "../assets/home/map.svg";
import tempImage from "../assets/home/temperature.svg";
import marker from "../assets/home/marker.svg";
import exit from "../assets/home/exit.svg";

import Modal from "../components/Modal";

import BusTownClosed1 from "../assets/home/busbackground/BusTownClosed1.mp4";
import BusTownClosed2 from "../assets/home/busbackground/BusTownClosed2.mp4";
import BusTownClosed3 from "../assets/home/busbackground/BusTownClosed3.mp4";
import BusTownOpen1 from "../assets/home/busbackground/BusTownOpen1.mp4";
import BusTownOpen3 from "../assets/home/busbackground/BusTownOpen3.mp4";

export default function HomeScreen({
  onPassengerScreen,
  onExitBus,
  onDriverScreen,
  currentScenario,
  setCurrentScenario,
  purchasedItems = [],
  onTravel,
  isDeliveryModalOpen,
  onCloseDeliveryModal,
  onConsumeItem,
  handleTemperatureToggle,
  isTurnedOn,
  finalTemperature,
  setBaseTemperature,
}) {
  const [isBagOpen, setIsBagOpen] = useState(false);

  let videoSource;
  let layoutClass;

  // Εμφανίζει το ανάλογο βίντεο φόντου με βάση το currentScenario
  if (currentScenario === "insideClosedTown1") {
    videoSource = BusTownClosed1;
  } else if (currentScenario === "insideClosedTown2") {
    videoSource = BusTownClosed2;
    layoutClass = "layout-town2";
  } else if (currentScenario === "insideClosedTown3") {
    videoSource = BusTownClosed3;
    layoutClass = "layout-town3";
  } else if (currentScenario === "insideOpenTown1") {
    videoSource = BusTownOpen1;
  } else if (currentScenario === "insideOpenTown3") {
    videoSource = BusTownOpen3;
  }

  // Αλλάζει το βίντεο φόντου όταν ο χρήστης κάνει κλικ σε ένα από τα markers του χάρτη
  const handleVideoSwitchToTown1 = () => {
    if (currentScenario !== "insideClosedTown1") {
      setCurrentScenario("insideClosedTown1");
      setBaseTemperature(32);
      onTravel?.();
    }
  };
  const handleVideoSwitchToTown2 = () => {
    if (currentScenario !== "insideClosedTown2") {
      setCurrentScenario("insideClosedTown2");
      setBaseTemperature(18);
      onTravel?.();
    }
  };
  const handleVideoSwitchToTown3 = () => {
    if (currentScenario !== "insideClosedTown3") {
      setCurrentScenario("insideClosedTown3");
      setBaseTemperature(28);
      onTravel?.();
    }
  };

  return (
    <div className="video-screen-frame">
      <div className="video-aspect-box">
        <video
          key={currentScenario}
          className="bg-video"
          src={videoSource}
          autoPlay
          loop
          muted
          playsInline
        />

        <div className={`overlay-content ${layoutClass}`}>
          {/* --- Οθόνες --- */}

          {/* Χάρτης */}
          <div className="map-wrapper map-position">
            {/* Διαδρομή χάρτη και το πλαίσιο του */}
            <img src={mapImage} alt="Map" className="actual-map-image" />

            {/* Marker πρώτης πόλης */}
            <img
              src={marker}
              alt="Stop 1"
              className="map-pin pin-1"
              onClick={handleVideoSwitchToTown1}
            />

            {/* Marker δεύτερης πόλης */}
            <img
              src={marker}
              alt="Stop 2"
              className="map-pin pin-2"
              onClick={handleVideoSwitchToTown2}
            />

            {/* Marker τρίτης πόλης */}
            <img
              src={marker}
              alt="Stop 3"
              className="map-pin pin-3"
              onClick={handleVideoSwitchToTown3}
            />
          </div>

          <img src={tempImage} alt="temperatureIcon" className="temp-image" />
          <span className="temp-value">{finalTemperature}</span>

          {/* Κουμπί εξόδου από το λεωφορείο */}
          <img
            src={exit}
            alt="Exit Bus"
            className="exit-btn"
            onClick={() => {
              onExitBus(currentScenario);
            }}
          />

          {/* Αριστερή οθόνη τουρίστα */}
          <img
            src={monitorImage}
            alt="Monitor 1"
            className="monitor-img screen-1"
            onClick={onPassengerScreen}
          />
          {/* Οθόνη οδηγού */}
          <img
            src={monitorImage}
            alt="Monitor 2"
            className="monitor-img screen-2"
            onClick={onPassengerScreen}
          />
          {/* Δεξιά πρώτη οθόνη τουρίστα */}
          <img
            src={monitorImage}
            alt="Monitor 3"
            className="monitor-img screen-3"
            onClick={onPassengerScreen}
          />
          {/* Δεξιά δεύτερη οθόνη τουρίστα */}
          <img
            src={monitorImage}
            alt="Monitor 4"
            className="monitor-img screen-4"
            onClick={onPassengerScreen}
          />

          {/* Κρύο: Αριστερή οθόνη τουρίστα */}
          <img
            src={
              isTurnedOn[0] ? activeColdScreenImage : inactiveColdScreenImage
            }
            alt="Monitor 4"
            className={`temp-screen temp-pos-0 ${
              isTurnedOn[0] ? "cold-temp-active" : ""
            }`}
            onClick={() => handleTemperatureToggle(0)}
          />
          {/* Ζέστη: Αριστερή οθόνη τουρίστα */}
          <img
            src={isTurnedOn[1] ? activeHotScreenImage : inactiveHotScreenImage}
            alt="Monitor 4"
            className={`temp-screen temp-pos-1 ${
              isTurnedOn[1] ? "hot-temp-active" : ""
            }`}
            onClick={() => handleTemperatureToggle(1)}
          />
          {/* Κρύο: Δεξιά πρώτη οθόνη τουρίστα */}
          <img
            src={
              isTurnedOn[2] ? activeColdScreenImage : inactiveColdScreenImage
            }
            alt="Monitor 4"
            className={`temp-screen temp-pos-2 ${
              isTurnedOn[2] ? "cold-temp-active" : ""
            }`}
            onClick={() => handleTemperatureToggle(2)}
          />
          {/* Ζέστη: Δεξιά πρώτη οθόνη τουρίστα */}
          <img
            src={isTurnedOn[3] ? activeHotScreenImage : inactiveHotScreenImage}
            alt="Monitor 4"
            className={`temp-screen temp-pos-3 ${
              isTurnedOn[3] ? "hot-temp-active" : ""
            }`}
            onClick={() => handleTemperatureToggle(3)}
          />
          {/* Κρύο: Δεξιά δεύτερη οθόνη τουρίστα */}
          <img
            src={
              isTurnedOn[4] ? activeColdScreenImage : inactiveColdScreenImage
            }
            alt="Monitor 4"
            className={`temp-screen temp-pos-4 ${
              isTurnedOn[4] ? "cold-temp-active" : ""
            }`}
            onClick={() => handleTemperatureToggle(4)}
          />
          {/* Ζέστη: Δεξιά δεύτερη οθόνη τουρίστα */}
          <img
            src={isTurnedOn[5] ? activeHotScreenImage : inactiveHotScreenImage}
            alt="Monitor 4"
            className={`temp-screen temp-pos-5 ${
              isTurnedOn[5] ? "hot-temp-active" : ""
            }`}
            onClick={() => handleTemperatureToggle(5)}
          />

          {/* Συνολικό εικονίδιο τσάντας αγορασμένων αντικειμένων */}
          <div className="bag-container" onClick={() => setIsBagOpen(true)}>
            {purchasedItems.length > 0 && (
              <div className="bag-badge">{purchasedItems.length}</div>
            )}
            <img
              src={bagImage}
              alt="Shopping Bag"
              className="shopping-bag-img"
            />
          </div>
        </div>

        {/* --- MODALS --- */}

        {/* Modal Καλαθιού */}
        {isBagOpen && (
          <Modal>
            <h2 style={{ color: "var(--brand-blue)", marginBottom: "20px" }}>
              Οι αγορές σας
            </h2>

            {purchasedItems.length === 0 ? (
              <p>Δεν έχετε αγοράσει τίποτα ακόμα.</p>
            ) : (
              <div
                style={{
                  maxHeight: "50vh",
                  overflowY: "auto",
                  textAlign: "left",
                }}
              >
                {purchasedItems.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      gap: "15px",
                      borderBottom: "1px solid #eee",
                      padding: "10px 0",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: "bold", color: "#333" }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: "0.85rem", color: "#666" }}>
                        {item.selectedOptions &&
                          Object.values(item.selectedOptions).join(", ")}
                      </div>
                    </div>
                    <div
                      style={{ fontWeight: "bold", color: "var(--brand-red)" }}
                    >
                      {item.price}
                    </div>
                    <button
                      className="btn-consume"
                      onClick={() => onConsumeItem(item.cartId)}
                    >
                      Κατανάλωση
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="modal-actions" style={{ marginTop: "20px" }}>
              <button
                className="btn-cancel"
                onClick={() => setIsBagOpen(false)}
              >
                Κλείσιμο
              </button>
            </div>
          </Modal>
        )}

        {/* Modal Επιβεβαίωσης Παράδοσης */}
        {isDeliveryModalOpen && (
          <Modal>
            <div className="success-modal-content">
              <div className="checkmark-circle">
                <svg viewBox="0 0 24 24" fill="none" className="checkmark-icon">
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <h2>Παραλαβή Επιτυχής!</h2>
              <p>Τα προϊόντα σας προστέθηκαν στην τσάντα σας.</p>

              <button className="btn-add" onClick={onCloseDeliveryModal}>
                Εντάξει
              </button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}
