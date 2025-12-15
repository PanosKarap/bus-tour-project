import React, { useState } from "react";
import "./App.css";
import Modal from "./components/Modal";

import HomeScreen from "./screens/HomeScreen";
import PassengerScreen from "./screens/Passenger/PassengerScreen";
import ShopsScreen from "./screens/Passenger/ShopsScreen";
import MenuScreen from "./screens/Passenger/MenuScreen";
import CheckoutScreen from "./screens/Passenger/CheckoutScreen";

export default function App() {
  const [view, setView] = useState("home"); // Δείχνει ποια οθόνη είναι ενεργή και εμφανίζεται: "home" | "shops" | "menu" | "checkout"
  const [selectedShopId, setSelectedShopId] = useState(null); // Κρατάει το id του επιλεγμένου καταστήματος
  const [cart, setCart] = useState([]); // Κρατάει τα αντικείμενα του καλαθιού
  const [isCartOpen, setIsCartOpen] = useState(false); // Ελέγχει αν το modal του καλαθιού είναι ανοιχτό
  const [purchasedItems, setPurchasedItems] = useState([]); // Κρατάει τα αντικείμενα που έχουν αγοραστεί και παραδοθεί στον χρήστη
  const [pendingItems, setPendingItems] = useState([]); // Κρατάει τα αντικείμενα που περιμένουν παράδοση
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false); // Ελέγχει αν το modal παράδοσης είναι ανοιχτό για επιβεβαίωση παραλαβής

  // --- ACTIONS ---

  // Αδειάζει καλάθι αν αλλάξει κατάστημα | Ενημερώνει το state του επιλεγμένου καταστήματος | Μεταβαίνει στην οθόνη μενού του επιλεγμένου καταστήματος
  const handleShopSelect = (id) => {
    if (selectedShopId !== id) setCart([]);
    setSelectedShopId(id);
    setView("menu");
  };

  const addToCart = (item, options) => {
    // Προσθέτει το αντικείμενο στο καλάθι με μοναδικό cartId με βάση την ώρα που έγινε η προσθήκη και τις επιλεγμένες επιλογές
    const orderItem = { ...item, cartId: Date.now(), selectedOptions: options };
    // Διατηρεί τα υπάρχοντα αντικείμενα και προσθέτει το νέο
    setCart([...cart, orderItem]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.cartId !== id));
  };

  const calculateTotal = () => {
    return cart
      .reduce(
        (total, item) => total + parseFloat(item.price.replace("€", "")),
        0
      )
      .toFixed(2);
  };

  // Ολοκληρώνει την πληρωμή: Μεταφέρει τα αντικείμενα του καλαθιού στα pendingItems, αδειάζει το καλάθι, κλείνει το modal καλαθιού και επιστρέφει στην αρχική οθόνη
  const handleFinalPayment = () => {
    setPendingItems([...pendingItems, ...cart]);
    setCart([]);
    setIsCartOpen(false);
    setView("home");
  };

  // Ελέγχει αν υπάρχουν αντικείμενα προς παράδοση κατά τη μετάβαση σε νέα πόλη | Αν ναι, τα μεταφέρει στα purchasedItems, αδειάζει τα pendingItems και ανοίγει το modal παράδοσης
  const handleTravelToNextTown = () => {
    if (pendingItems.length > 0) {
      setPurchasedItems((prev) => [...prev, ...pendingItems]);
      setPendingItems([]);
      setIsDeliveryModalOpen(true);
    }
  };

  const handleConsumeItem = (cartId) => {
    setPurchasedItems((prevItems) =>
      prevItems.filter((item) => item.cartId !== cartId)
    );
  };

  // --- Εμφάνιση στην οθόνη ---

  return (
    <>
      {view === "home" && (
        <HomeScreen
          onPassengerScreen={() => setView("passengerScreen")}
          onDriverScreen={() => setView("driverScreen")}
          purchasedItems={purchasedItems}
          onTravel={handleTravelToNextTown}
          isDeliveryModalOpen={isDeliveryModalOpen}
          onCloseDeliveryModal={() => setIsDeliveryModalOpen(false)}
          onConsumeItem={handleConsumeItem}
        />
      )}

      {view === "passengerScreen" && (
        <PassengerScreen
          onForward={() => setView("shops")}
          onBack={() => setView("home")}
        />
      )}

      {view === "driverScreen" && (
        <DriverScreen onBack={() => setView("home")} />
      )}

      {view === "shops" && (
        <ShopsScreen
          onSelectShop={handleShopSelect}
          onBack={() => setView("passengerScreen")}
        />
      )}

      {view === "menu" && (
        <MenuScreen
          shopId={selectedShopId}
          cartCount={cart.length}
          onAddToCart={addToCart}
          onBack={() => setView("shops")}
          onOpenCart={() => setIsCartOpen(true)}
        />
      )}

      {view === "checkout" && (
        <CheckoutScreen
          cart={cart}
          total={calculateTotal()}
          onPay={handleFinalPayment}
          onBack={() => setView("menu")}
        />
      )}

      {/* Modal καλαθιού */}
      {isCartOpen && view === "menu" && (
        <Modal>
          <h2>Το καλάθι σας</h2>
          {cart.length === 0 ? (
            <p>Το καλάθι είναι άδειο.</p>
          ) : (
            <div
              style={{
                textAlign: "left",
                marginBottom: "20px",
                maxHeight: "60vh",
                overflowY: "auto",
              }}
            >
              {cart.map((item) => (
                <div
                  key={item.cartId}
                  style={{ borderBottom: "1px solid #eee", padding: "10px 0" }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontWeight: "bold",
                    }}
                  >
                    <span>{item.name}</span>
                    <span>{item.price}</span>
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#666" }}>
                    {Object.values(item.selectedOptions).join(", ")}
                  </div>
                  <button
                    onClick={() => removeFromCart(item.cartId)}
                    style={{
                      color: "red",
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                    }}
                  >
                    Κατάργηση
                  </button>
                </div>
              ))}
              <div
                style={{
                  marginTop: "20px",
                  textAlign: "right",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                Σύνολο: €{calculateTotal()}
              </div>
            </div>
          )}
          <div className="modal-actions">
            <button className="btn-cancel" onClick={() => setIsCartOpen(false)}>
              Κλείσιμο
            </button>
            {cart.length > 0 && (
              <button
                className="btn-add"
                onClick={() => {
                  setIsCartOpen(false);
                  setView("checkout");
                }}
              >
                Ολοκλήρωση
              </button>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}
