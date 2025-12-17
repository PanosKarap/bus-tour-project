import React, { useState } from "react";
import "./App.css";
import Modal from "./components/Modal";
import TabletLayout from "./screens/Passenger/TabletLayout";
import HomeScreen from "./screens/HomeScreen";
import PassengerScreen from "./screens/Passenger/PassengerScreen";
import Fullscreen from "./screens/Passenger/Fullscreen/Fullscreen";
import SightsMenuScreen from "./screens/Passenger/Sights/SightMenuScreen";
// import DriverScreen from "./screens/Driver/DriverScreen";
import ShopsScreen from "./screens/Passenger/Order/ShopsScreen";
import MenuScreen from "./screens/Passenger/Order/MenuScreen";
import CheckoutScreen from "./screens/Passenger/Order/CheckoutScreen";

export default function App() {
  const [view, setView] = useState("home"); // Δείχνει ποια οθόνη είναι ενεργή και εμφανίζεται: "home" | "shops" | "menu" | "checkout"
  const [isTabletMode, setIsTabletMode] = useState(false); // Νέο state: Ελέγχει αν είμαστε έξω με το tablet
  const [currentScenario, setCurrentScenario] = useState("insideClosedTown1"); // Κρατάει το name για το αντίστοιχο βίντεο φόντου
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

  // Ολοκληρώνει την πληρωμή: Μεταφέρει τα αντικείμενα του καλαθιού στα pendingItems, αδειάζει το καλάθι, κλείνει το modal καλαθιού
  const handleFinalPayment = () => {
    setPendingItems([...pendingItems, ...cart]);
    setCart([]);
    setIsCartOpen(false);

    // Ελέγχει αν είμαστε σε tablet mode για να επιστρέψει στην κατάλληλη οθόνη
    if (isTabletMode) {
      setView("shops");
    } else {
      setView("home");
    }
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

  // --- NAVIGATION HANDLERS ---

  // Ενεργοποιείται από το κουμπί εξόδου στο HomeScreen -> Μπαίνει σε λειτουργία Tablet (Έξω)
  const handleExitBus = () => {
    setIsTabletMode(true);
    setView("passengerScreen"); // Ξεκινάει στο μενού επιβάτη μέσα στο tablet
  };

  // Επιστροφή στη θέση (μέσα στο λεωφορείο) -> Κλείνει το Tablet layout
  const handleReturnToBus = () => {
    setIsTabletMode(false);
    setView("home");
  };

  // --- Εμφάνιση στην οθόνη ---

  return (
    <>
      {/* 1. HOME SCREEN */}
      {view === "home" && (
        <HomeScreen
          onPassengerScreen={() => setView("passengerScreen")}
          onExitBus={handleExitBus} // Ενεργοποιεί το Tablet Mode
          onDriverScreen={() => setView("driverScreen")}
          currentScenario={currentScenario}
          setCurrentScenario={setCurrentScenario}
          purchasedItems={purchasedItems}
          onTravel={handleTravelToNextTown}
          isDeliveryModalOpen={isDeliveryModalOpen}
          onCloseDeliveryModal={() => setIsDeliveryModalOpen(false)}
          onConsumeItem={handleConsumeItem}
        />
      )}

      {/* 2. PASSENGER SCREEN */}
      {view === "passengerScreen" &&
        (isTabletMode ? (
          <TabletLayout currentScenario={currentScenario}>
            <PassengerScreen
              onFullscreen={() => setView("fullscreen")}
              onOrder={() => setView("shops")}
              onSights={() => setView("sightsMenu")}
              onBack={handleReturnToBus}
            />
          </TabletLayout>
        ) : (
          <PassengerScreen
            onFullscreen={() => setView("fullscreen")}
            onOrder={() => setView("shops")}
            onSights={() => setView("sightsMenu")}
            onBack={() => setView("home")}
          />
        ))}

      {/* 3. FULLSCREEN */}
      {view === "fullscreen" &&
        (isTabletMode ? (
          <TabletLayout currentScenario={currentScenario}>
            <Fullscreen
              currentScenario={currentScenario}
              onBack={() => setView("passengerScreen")}
            />
          </TabletLayout>
        ) : (
          <Fullscreen
            currentScenario={currentScenario}
            onBack={() => setView("passengerScreen")}
          />
        ))}

      {/* 4. SHOPS SCREEN */}
      {view === "shops" &&
        (isTabletMode ? (
          <TabletLayout currentScenario={currentScenario}>
            <ShopsScreen
              onSelectShop={handleShopSelect}
              onBack={() => setView("passengerScreen")}
            />
          </TabletLayout>
        ) : (
          <ShopsScreen
            onSelectShop={handleShopSelect}
            onBack={() => setView("passengerScreen")}
          />
        ))}

      {/* 5. SHOP MENU SCREEN */}
      {view === "menu" &&
        (isTabletMode ? (
          <TabletLayout currentScenario={currentScenario}>
            <MenuScreen
              shopId={selectedShopId}
              cartCount={cart.length}
              onAddToCart={addToCart}
              onBack={() => setView("shops")}
              onOpenCart={() => setIsCartOpen(true)}
            />
          </TabletLayout>
        ) : (
          <MenuScreen
            shopId={selectedShopId}
            cartCount={cart.length}
            onAddToCart={addToCart}
            onBack={() => setView("shops")}
            onOpenCart={() => setIsCartOpen(true)}
          />
        ))}

      {/* 6. CHECKOUT SCREEN */}
      {view === "checkout" &&
        (isTabletMode ? (
          <TabletLayout currentScenario={currentScenario}>
            <CheckoutScreen
              cart={cart}
              total={calculateTotal()}
              onPay={handleFinalPayment}
              onBack={() => setView("menu")}
            />
          </TabletLayout>
        ) : (
          <CheckoutScreen
            cart={cart}
            total={calculateTotal()}
            onPay={handleFinalPayment}
            onBack={() => setView("menu")}
          />
        ))}

      {/* 7. SIGHTS SCREEN */}
      {view === "sightsMenu" &&
        (isTabletMode ? (
          <TabletLayout currentScenario={currentScenario}>
            <SightsMenuScreen
              currentScenario={currentScenario}
              onSelectSight={() => setView("sight")}
              onBack={() => setView("passengerScreen")}
            />
          </TabletLayout>
        ) : (
          <SightsMenuScreen
            currentScenario={currentScenario}
            onSelectSight={() => setView("sight")}
            onBack={() => setView("passengerScreen")}
          />
        ))}

      {/* 8. SPECIFIC SIGHT SCREEN */}
      {view === "sight" &&
        (isTabletMode ? (
          <TabletLayout currentScenario={currentScenario}>
            <SightsMenuScreen
              onSelectSight={handleSightSelect}
              onBack={() => setView("passengerScreen")}
            />
          </TabletLayout>
        ) : (
          <SightsMenuScreen
            onSelectSight={handleSightSelect}
            onBack={() => setView("passengerScreen")}
          />
        ))}

      {/* 2. ΟΔΗΓΟΣ (Μόνο αν δεν είμαστε σε Tablet Mode) */}
      {view === "driverScreen" && (
        // <DriverScreen onBack={() => setView("home")} />
        <div>Driver Screen Placeholder</div>
      )}

      {/* Modal καλαθιού */}
      {isCartOpen && (
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
