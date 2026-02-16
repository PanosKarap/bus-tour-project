import React, { useState } from "react";
import "./CheckoutScreen.css";
import bgImage from "../../../assets/passenger/order/coffee-bg.webp";
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
    let { name, value } = e.target;

    if (name === "number") {
      // Κρατάει μόνο αριθμούς, μέγιστο 16 ψηφία, και βάζει κενά ανά 4
      value = value
        .replace(/\D/g, "")
        .slice(0, 16)
        .replace(/(\d{4})(?=\d)/g, "$1 ");
    } else if (name === "name") {
      // Αν περιέχει αριθμούς ή σύμβολα (εκτός από κενό), δεν το δέχεται
      if (/[^a-zA-Z\u0370-\u03ff\u1f00-\u1fff\s]/.test(value)) return;
    } else if (name === "expiry") {
      // Μόνο αριθμοί, βάζει αυτόματα την κάθετο (MM/YY)
      value = value.replace(/\D/g, "").slice(0, 4);
      if (value.length >= 3) value = value.slice(0, 2) + "/" + value.slice(2);
    } else if (name === "cvv") {
      // Μόνο αριθμοί, μέχρι 3 ψηφία
      value = value.replace(/\D/g, "").slice(0, 3);
    }
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const handlePayment = () => {
    // Έλεγχος αν όλα τα πεδία της κάρτας είναι συμπληρωμένα αν επιλεγεί πληρωμή με κάρτα
    if (paymentMethod === "card") {
      // Μικρός επιπλέον έλεγχος ότι ο αριθμός κάρτας έχει το σωστό μήκος (19 chars με τα κενά)
      if (
        !cardDetails.number ||
        cardDetails.number.length < 19 ||
        !cardDetails.name ||
        !cardDetails.expiry ||
        !cardDetails.cvv
      ) {
        alert("Παρακαλώ συμπληρώστε σωστά τα στοιχεία της κάρτας.");
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
      <h2 className="checkout-title">ταμειο</h2>

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

      <h3 className="payment-section-title">Τρόπος Πληρωμής</h3>

      <div className="button-container checkout-payment-options">
        <button
          className={`btn payment-option-btn ${
            paymentMethod === "card" ? "brown" : "btn-inactive"
          }`}
          onClick={() => setPaymentMethod("card")}
        >
          <span className="payment-icon">💳</span>
          <span>Κάρτα</span>
        </button>

        <button
          className={`btn payment-option-btn ${
            paymentMethod === "cash" ? "brown" : "btn-inactive"
          }`}
          onClick={() => setPaymentMethod("cash")}
        >
          <span className="payment-icon">💵</span>
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
          <p className="success-message">
            Η παραγγελία σας στάλθηκε στην κουζίνα. Θα την παραλάβετε στην
            επόμενη στάση.
          </p>
          <div className="success-total">Πληρώθηκε: €{total}</div>
          <div className="payment-tag">
            {paymentMethod === "card"
              ? "Πληρωμή με Κάρτα"
              : "Πληρωμή με Μετρητά"}
          </div>
          <button className="btn-add success-home-btn" onClick={finalizeOrder}>
            Επιστροφή στην Αρχική
          </button>
        </Modal>
      )}
    </div>
  );
}
