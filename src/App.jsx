import React, { useState } from "react";
import "./App.css";
import Modal from "./components/Modal";
import TabletLayout from "./screens/Passenger/TabletLayout";
import HomeScreen from "./screens/HomeScreen";
import PassengerScreen from "./screens/Passenger/PassengerScreen";
import Fullscreen from "./screens/Passenger/Fullscreen/Fullscreen";
import SightsMenuScreen from "./screens/Passenger/Sights/SightMenuScreen";
import SightScreen from "./screens/Passenger/Sights/SightScreen";
// import DriverScreen from "./screens/Driver/DriverScreen";
import ShopsScreen from "./screens/Passenger/Order/ShopsScreen";
import MenuScreen from "./screens/Passenger/Order/MenuScreen";
import CheckoutScreen from "./screens/Passenger/Order/CheckoutScreen";

export default function App() {
  // ******* Μεταβλητές - States *******
  const [view, setView] = useState("home"); // Δείχνει ποια οθόνη είναι ενεργή και εμφανίζεται
  const [isTabletMode, setIsTabletMode] = useState(false); // Κρατάει το state για το αν είμαστε σε tablet mode ή όχι
  const [currentScenario, setCurrentScenario] = useState("insideClosedTown1"); // Κρατάει το name για το αντίστοιχο βίντεο φόντου

  const [selectedSight, setSelectedSight] = useState(null); // Κρατάει το αντικείμενο που περιλαμβάνει όλες τις πληροφορίες του αξιοθέατου

  // --Παραγγελίες--
  const [selectedShopId, setSelectedShopId] = useState(null); // Κρατάει το id του επιλεγμένου καταστήματος
  const [cart, setCart] = useState([]); // Κρατάει τα αντικείμενα του καλαθιού εντός του καταστήματος
  const [isCartOpen, setIsCartOpen] = useState(false); // Ελέγχει αν το modal του καλαθιού εντός του καταστήματος είναι ανοιχτό

  const [pendingItems, setPendingItems] = useState([]); // Κρατάει τα αντικείμενα που περιμένουν παράδοση στην τσάντα
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false); // Ελέγχει αν το modal παράδοσης για επιβεβαίωση παραλαβής είναι ανοιχτό

  const [purchasedItems, setPurchasedItems] = useState([]); // Κρατάει τα αντικείμενα που έχουν αγοραστεί και παραδοθεί στον χρήστη και βρίσκονται στην τσάντα του
  const [isBagOpen, setIsBagOpen] = useState(false); // Ελέγχει αν το modal της τσάντας με τα αγορασμένα αντικείμενα είναι ανοιχτό

  // --Θερμοκρασίες και κλιματισμοί--
  const [baseTemperature, setBaseTemperature] = useState(32); // Κρατάει την βασική θερμοκρασία εσωτερικά του λεωφορείου χωρίς ανοιχτούς κλιματισμούς
  const [isTurnedOn, setIsTurnedOn] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]); // Κρατάει τα states ενεργού/ανενεργού για κάθε κλιματισμό (6 συνολικά)

  // Υπολογίζει την τελική θερμοκρασία με βάση τους ενεργούς κλιματισμούς
  const calculateTotalTemperature = () => {
    let modifier = 0;
    isTurnedOn.forEach((isTurnedOn, index) => {
      if (isTurnedOn) {
        modifier += index % 2 === 0 ? -1 : 1; // Index κρύων οθονών: 0, 2, 4 (Odd) | Index ζεστών οθονών: 1, 3, 5 (Even)
      }
    });
    return baseTemperature + modifier;
  };
  const finalTemperature = `${calculateTotalTemperature()}°C`; // Κρατάει την τελική θερμοκρασία σε μορφή string με °C για εμφάνιση στην οθόνη

  // ******* Συναρτήσεις *******

  // --Πλοήγηση από το λεωφορείο στο tablet mode και το αντίστροφο--
  // Ενεργοποιείται από το κουμπί εξόδου στο HomeScreen -> Μπαίνει σε λειτουργία Tablet (Έξω)
  const handleExitBus = () => {
    setIsTabletMode(true);
    setView("passengerScreen");
  };
  // Επιστροφή στη θέση (μέσα στο λεωφορείο) -> Κλείνει το Tablet layout
  const handleReturnToBus = () => {
    setIsTabletMode(false);
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

  // Αφαιρεί το αντικείμενο με το συγκεκριμένο cartId από τα items της τσάντας μετά την κατανάλωση του
  const handleConsumeItem = (cartId) => {
    setPurchasedItems((prevItems) =>
      prevItems.filter((item) => item.cartId !== cartId)
    );
  };

  // --Παραγγελίες--
  // Μεταβαίνει στην οθόνη μενού του επιλεγμένου καταστήματος
  const handleShopSelect = (id) => {
    if (selectedShopId !== id) setCart([]); // Για να ισχύει, σημαίνει ότι αλλάξαμε κατάστημα οπότε αδειάζουμε το καλάθι
    setSelectedShopId(id); // Ενημερώνουμε το id του νέου επιλεγμένου καταστήματος
    setView("menu");
  };
  const addToCart = (item, options) => {
    // Προσθέτει το αντικείμενο στο καλάθι με μοναδικό cartId με βάση την ώρα που έγινε η προσθήκη και τις επιλεγμένες επιλογές
    const orderItem = { ...item, cartId: Date.now(), selectedOptions: options };
    // Διατηρεί τα υπάρχοντα αντικείμενα και προσθέτει το νέο
    setCart([...cart, orderItem]); // Διατηρεί τα υπάρχοντα αντικείμενα και προσθέτει το νέο
  };
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.cartId !== id)); // Δημιουργεί έναν νέο πίνακα cart που περιέχει όλα τα στοιχεία εκτός εκείνου με το επιλεγμένο cartId
  };
  // Υπολογίζει το τελικό ποσό από τα αντικείμενα που έχουν προστεθεί στο καλάθι
  const calculateTotal = () => {
    return cart
      .reduce(
        (total, item) => total + parseFloat(item.price.replace("€", "")),
        0
      )
      .toFixed(2);
  };
  // Ολοκληρώνει την πληρωμή
  const handleFinalPayment = () => {
    setPendingItems([...pendingItems, ...cart]); // Μεταφέρει τα αντικείμενα του καλαθιού στα pendingItems
    setCart([]); // Αδειάζει το καλάθι
    setIsCartOpen(false); // Κλείνει το modal καλαθιού

    // Ελέγχει αν είμαστε σε tablet mode για να επιστρέψει στην κατάλληλη οθόνη
    if (isTabletMode) {
      setView("passengerScreen");
    } else {
      setView("home");
    }
  };

  // Εναλλάσσει την κατάσταση ενεργού/ανενεργού για τον κλιματισμό στο συγκεκριμένο index
  const handleTemperatureToggle = (index) => {
    const updatedStates = [...isTurnedOn]; // Δημιουργεί ένα αντίγραφο του τρέχοντος πίνακα από states
    updatedStates[index] = !updatedStates[index]; // Αντιστροφή της τιμής στο συγκεκριμένο index
    setIsTurnedOn(updatedStates); // Ενημερώνει το state με τον νέο πίνακα
  };

  // Συνάρτηση που περιέχει όλες τις διεπαφές εντός της οθόνης του τουρίστα
  const renderCurrentView = () => {
    switch (view) {
      case "passengerScreen":
        return (
          <>
            {/* -- ΔΙΕΠΑΦΗ ΤΟΥΡΙΣΤΑ -- */}
            <PassengerScreen
              onFullscreen={() => setView("fullscreen")}
              onOrder={() => setView("shops")}
              onSights={() => setView("sightsMenu")}
              onBack={isTabletMode ? handleReturnToBus : () => setView("home")}
            />
          </>
        );

      case "fullscreen":
        return (
          <>
            {/* ΛΕΙΤΟΥΡΓΙΑ: ΦΩΤΟΓΡΑΦΙΑ ΤΗΣ ΠΟΛΗΣ ΠΟΥ ΒΡΙΣΚΕΤΑΙ Ο ΤΟΥΡΙΣΤΑΣ ΣΕ FULLSCREEN */}
            <Fullscreen
              currentScenario={currentScenario}
              onBack={() => setView("passengerScreen")}
            />
          </>
        );

      case "shops":
        return (
          <>
            {/* ΛΕΙΤΟΥΡΓΙΑ: ΔΙΕΠΑΦΗ ΜΕ ΤΑ ΔΙΑΘΕΣΙΜΑ ΚΑΤΑΣΤΗΜΑΤΑ ΓΙΑ ΠΑΡΑΓΓΕΛΙΑ */}
            <ShopsScreen
              onSelectShop={handleShopSelect}
              onBack={() => setView("passengerScreen")}
            />
          </>
        );

      case "menu":
        return (
          <>
            {/* ΜΕΝΟΥ ΤΟΥ ΕΠΙΛΕΓΜΕΝΟΥ ΚΑΤΑΣΤΗΜΑΤΟΣ */}
            <MenuScreen
              shopId={selectedShopId}
              cartCount={cart.length}
              onAddToCart={addToCart}
              onBack={() => setView("shops")}
              onOpenCart={() => setIsCartOpen(true)}
            />
          </>
        );

      case "checkout":
        return (
          <>
            {/* ΔΙΕΠΑΦΗ ΠΛΗΡΩΜΗΣ ΚΑΙ ΟΛΟΚΛΗΡΩΣΗΣ ΠΑΡΑΓΓΕΛΙΑΣ */}
            <CheckoutScreen
              cart={cart}
              total={calculateTotal()}
              onPay={handleFinalPayment}
              onBack={() => setView("menu")}
            />
          </>
        );

      case "sightsMenu":
        return (
          <>
            {/* ΛΕΙΤΟΥΡΓΙΑ: ΔΙΕΠΑΦΗ ΜΕ ΤΑ ΔΙΑΘΕΣΙΜΑ ΑΞΙΟΘΕΑΤΑ ΤΗΣ ΑΝΤΙΣΤΟΙΧΗΣ ΠΟΛΗΣ ΠΟΥ ΒΡΙΣΚΕΤΑΙ Ο ΤΟΥΡΙΣΤΑΣ */}
            <SightsMenuScreen
              currentScenario={currentScenario}
              onSelectSight={(sightData) => {
                setSelectedSight(sightData);
                setView("sight");
              }}
              onBack={() => setView("passengerScreen")}
            />
          </>
        );

      case "sight":
        return (
          <>
            {/* ΔΙΕΠΑΦΗ ΠΟΥ ΠΑΡΟΥΣΙΑΖΕΙ ΑΝΑΛΥΤΙΚΟΤΕΡΑ ΤΟ ΚΑΘΕ ΑΞΙΟΘΕΑΤΟ */}
            <SightScreen
              sight={selectedSight}
              onBack={() => {
                setSelectedSight(null);
                setView("sightsMenu");
              }}
            />
          </>
        );
    }
  };

  // ******* Εμφάνιση στην οθόνη *******
  return (
    <>
      {/* ΑΡΧΙΚΗ ΟΘΟΝΗ */}
      {view === "home" && (
        <HomeScreen
          // ΠΡΟΣΒΑΣΗ ΣΕ ΟΘΟΝΕΣ ΤΟΥΡΙΣΤΑ-ΟΔΗΓΟΥ ΚΑΙ ΕΞΟΔΟΣ ΑΠΟ ΛΕΩΦΟΡΕΙΟ
          onPassengerScreen={() => setView("passengerScreen")}
          onExitBus={handleExitBus}
          onDriverScreen={() => setView("driverScreen")}
          // ΜΕΤΑΒΛΗΤΕΣ - STATES ΠΟΥ ΧΡΕΙΑΖΟΝΤΑΙ ΣΤΟ COMPONENT HOMESCREEN ΓΙΑ ΝΑ ΕΚΤΕΛΕΣΕΙ ΔΙΑΦΟΡΕΣ ΛΕΙΤΟΥΡΓΙΕΣ
          currentScenario={currentScenario}
          setCurrentScenario={setCurrentScenario}
          //
          onTravel={handleTravelToNextTown}
          //
          purchasedItems={purchasedItems}
          isBagOpen={isBagOpen}
          setIsBagOpen={setIsBagOpen}
          onConsumeItem={handleConsumeItem}
          //
          isDeliveryModalOpen={isDeliveryModalOpen}
          onCloseDeliveryModal={() => setIsDeliveryModalOpen(false)}
          //
          isTurnedOn={isTurnedOn}
          handleTemperatureToggle={handleTemperatureToggle}
          //
          finalTemperature={finalTemperature}
          setBaseTemperature={setBaseTemperature}
        />
      )}

      {/* ΟΛΕΣ ΟΙ ΥΠΟΛΟΙΠΕΣ ΔΙΕΠΑΦΕΣ ΤΟΥ ΤΟΥΡΙΣΤΑ ΣΕ ΜΟΡΦΗ ΕΙΤΕ ΚΑΝΟΝΙΚΗ ΕΙΤΕ ΤΑΜΠΛΕΤ */}
      {isTabletMode ? (
        <TabletLayout currentScenario={currentScenario}>
          {renderCurrentView()}
        </TabletLayout>
      ) : (
        renderCurrentView()
      )}

      {/* ΠΡΟΣ ΥΛΟΠΟΙΗΣΗ */}
      {view === "driverScreen" && <DriverScren />}

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
