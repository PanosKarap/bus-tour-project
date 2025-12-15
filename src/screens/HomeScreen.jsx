import React, { useState } from "react";
import monitorImage from "../assets/passenger/passenger-screen.png";
import bagImage from "../assets/bag.png";

// Import the Modal Component
import Modal from "../components/Modal";

// Import Videos
import townVideo1 from "../assets/busbackground/BusTownClosed1.mp4";
import townVideo2 from "../assets/busbackground/BusTownClosed2.mp4";
import townVideo3 from "../assets/busbackground/BusTownClosed3.mp4";

export default function HomeScreen({
  onPassengerScreen,
  onDriverScreen,
  purchasedItems = [],
  onTravel,
  isDeliveryModalOpen,
  onCloseDeliveryModal,
  onConsumeItem,
}) {
  const [currentScenario, setCurrentScenario] = useState("town1"); // Κρατάει την τρέχουσα πόλη
  const [isBagOpen, setIsBagOpen] = useState(false); // Ελέγχει αν το modal της τσάντας είναι ανοιχτό

  let videoSource;
  let layoutClass;

  if (currentScenario === "town1") {
    videoSource = townVideo1;
  } else if (currentScenario === "town2") {
    videoSource = townVideo2;
    layoutClass = "layout-town2";
  } else {
    videoSource = townVideo3;
  }

  // Αλλάζει την πόλη και καλεί την onTravel συνάρτηση για έλεγχο ύπαρξης κάποιας παραλαβής
  const handleVideoSwitch = () => {
    if (currentScenario === "town1") setCurrentScenario("town2");
    else if (currentScenario === "town2") setCurrentScenario("town3");
    else setCurrentScenario("town1");

    onTravel?.();
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
          <button
            style={{
              position: "absolute",
              top: 20,
              left: 20,
              zIndex: 100,
              pointerEvents: "auto",
            }}
            onClick={handleVideoSwitch}
          >
            Αλλαγή Πόλης
          </button>

          {/* Οθόνες */}

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
            {/* Εικονίδιο που απεικονίζει τον αριθμό των αγορασμένων αντικειμένων που έχει γίνει η παραλαβή τους */}
            {purchasedItems.length > 0 && (
              <div className="bag-badge">{purchasedItems.length}</div>
            )}
            {/* Εικονίδιο τσάντας */}
            <img
              src={bagImage}
              alt="Shopping Bag"
              className="shopping-bag-img"
            />
          </div>
        </div>

        {/* Modal που ανοίγει όταν πατήσει ο χρήστης την τσάντα. Ανοίγει μία λίστα με τα αντικείμενα */}
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

            {/* Κουμπί κλεισίματος modal */}
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

        {/* Modal επιβεβαίωσης παράδοσης παραγγελίας. Ανοίγει όταν ο τουρίστας αλλάξει πόλη και είχε κάνει παραγγελία στην προηγούμενη πόλη που βρισκόταν */}
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

              {/* Κλείσιμο modal */}
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
