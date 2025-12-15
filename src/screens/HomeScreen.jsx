import React, { useState } from "react";
import monitorImage from "../assets/passenger/passenger-screen.png";
import bagImage from "../assets/bag.svg";
import mapImage from "../assets/map.svg";
import marker from "../assets/marker.svg";

// Import the Modal Component
import Modal from "../components/Modal";

// Import Videos
import BusTownClosed1 from "../assets/busbackground/BusTownClosed1.mp4";
import BusTownClosed2 from "../assets/busbackground/BusTownClosed2.mp4";
import BusTownClosed3 from "../assets/busbackground/BusTownClosed3.mp4";
import BusTownOpen1 from "../assets/busbackground/BusTownOpen1.mp4";
import BusTownOpen3 from "../assets/busbackground/BusTownOpen3.mp4";

export default function HomeScreen({
  onPassengerScreen,
  onDriverScreen,
  purchasedItems = [],
  onTravel,
  isDeliveryModalOpen,
  onCloseDeliveryModal,
  onConsumeItem,
}) {
  const [currentScenario, setCurrentScenario] = useState("insideClosedTown1");
  const [isBagOpen, setIsBagOpen] = useState(false);

  let videoSource;
  let layoutClass;

  if (currentScenario === "insideClosedTown1") {
    videoSource = BusTownClosed1;
  } else if (currentScenario === "insideClosedTown2") {
    videoSource = BusTownClosed2;
    layoutClass = "layout-town2";
  } else if (currentScenario === "insideClosedTown3") {
    videoSource = BusTownClosed3;
    layoutClass = "layout-town3";
  } else if (currentScenario === "outsideTown1") {
    videoSource = BusTownOpen1;
  } else if (currentScenario === "outsideTown2") {
    videoSource = BusTownClosed2;
  } else if (currentScenario === "outsideTown3") {
    videoSource = BusTownOpen3;
  }

  const handleVideoSwitchToTown1 = () => {
    if (currentScenario !== "insideClosedTown1") {
      setCurrentScenario("insideClosedTown1");
      onTravel?.();
    }
  };
  const handleVideoSwitchToTown2 = () => {
    if (currentScenario !== "insideClosedTown2") {
      setCurrentScenario("insideClosedTown2");
      onTravel?.();
    }
  };
  const handleVideoSwitchToTown3 = () => {
    if (currentScenario !== "insideClosedTown3") {
      setCurrentScenario("insideClosedTown3");
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
