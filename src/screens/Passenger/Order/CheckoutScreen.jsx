import React, { useState } from "react";
import bgImage from "../../../assets/passenger/order/coffee-bg.jpg";
import Modal from "../../../components/Modal";

export default function CheckoutScreen({ cart, total, onPay, onBack }) {
  const [paymentMethod, setPaymentMethod] = useState("card"); // Κρατάει τον επιλεγμένο τρόπο πληρωμής
  const [showSuccess, setShowSuccess] = useState(false); // Ελέγχει αν θα εμφανιστεί το modal επιτυχίας

  // Κρατάει τα στοιχεία της κάρτας αν επιλεγεί πληρωμή με κάρτα | Τα αρχικοποιεί κενά
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  // Ενημερώνει τα στοιχεία της κάρτας κατά την πληκτρολόγηση
  const handleInputChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handlePayment = () => {
    // Έλεγχος αν όλα τα πεδία της κάρτας είναι συμπληρωμένα αν επιλεγεί πληρωμή με κάρτα
    if (paymentMethod === "card") {
      if (
        !cardDetails.number ||
        !cardDetails.name ||
        !cardDetails.expiry ||
        !cardDetails.cvv
      ) {
        alert("Παρακαλώ συμπληρώστε τα στοιχεία της κάρτας.");
        return;
      }
    }
    setShowSuccess(true);
  };

  const finalizeOrder = () => {
    setShowSuccess(false);
    onPay();
  };

  return (
    <div
      className="container menu-mode"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <h2 className="header header-box">ταμειο</h2>

      <div className="checkout-summary">
        <h3>Σύνοψη Παραγγελίας</h3>
        <div className="summary-list">
          {cart.map((item) => (
            <div key={item.cartId} className="summary-item">
              <span>{item.name}</span>
              <span>{item.price}</span>
            </div>
          ))}
        </div>
        <div className="summary-total">Σύνολο: €{total}</div>
      </div>

      <h3
        style={{
          color: "white",
          marginTop: "30px",
          textShadow: "0 2px 4px rgba(0,0,0,0.5)",
        }}
      >
        Τρόπος Πληρωμής
      </h3>

      <div
        className="button-container"
        style={{ maxWidth: "600px", marginTop: "10px" }}
      >
        <button
          className={`btn ${
            paymentMethod === "card" ? "brown" : "btn-inactive"
          }`}
          style={{ height: "150px" }}
          onClick={() => setPaymentMethod("card")}
        >
          <span style={{ fontSize: "40px" }}>💳</span>
          <span>Κάρτα</span>
        </button>

        <button
          className={`btn ${
            paymentMethod === "cash" ? "brown" : "btn-inactive"
          }`}
          style={{ height: "150px" }}
          onClick={() => setPaymentMethod("cash")}
        >
          <span style={{ fontSize: "40px" }}>💵</span>
          <span>Μετρητά</span>
        </button>
      </div>

      {/* Επιπλέον πεδία για πληρωμή με κάρτα: */}
      {paymentMethod === "card" && (
        <div className="card-form-container">
          <input
            type="text"
            name="number"
            placeholder="Αριθμός Κάρτας (0000 0000 0000 0000)"
            className="form-input full-width"
            maxLength="19"
            value={cardDetails.number}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="name"
            placeholder="Όνομα Κατόχου"
            className="form-input full-width"
            value={cardDetails.name}
            onChange={handleInputChange}
          />
          <div className="form-row">
            <input
              type="text"
              name="expiry"
              placeholder="MM/YY"
              className="form-input"
              maxLength="5"
              value={cardDetails.expiry}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              className="form-input"
              maxLength="3"
              value={cardDetails.cvv}
              onChange={handleInputChange}
            />
          </div>
        </div>
      )}

      <button className="pay-now-btn" onClick={handlePayment}>
        Πληρωμή €{total}
      </button>

      <button className="btn-back" onClick={onBack}>
        &larr; Επιστροφή
      </button>

      {/* Modal Επιτυχίας */}
      {showSuccess && (
        <Modal className="success-modal">
          <div className="success-icon-container">
            <svg className="success-icon" viewBox="0 0 24 24">
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <h2>Η παραγγελία ελήφθη!</h2>
          <p style={{ fontSize: "1.2rem", color: "#555" }}>
            Η παραγγελία σας στάλθηκε στην κουζίνα. Θα την παραλάβετε στην
            επόμενη στάση.
          </p>
          <div className="success-total">Πληρώθηκε: €{total}</div>
          <div className="payment-tag">
            {paymentMethod === "card"
              ? "Πληρωμή με Κάρτα"
              : "Πληρωμή με Μετρητά"}
          </div>
          <button
            className="btn-add"
            style={{ marginTop: "30px", width: "100%" }}
            onClick={finalizeOrder}
          >
            Επιστροφή στην Αρχική
          </button>
        </Modal>
      )}
    </div>
  );
}
