import React from "react";
import "./SightMenuScreen.css";

import Town1Sight1 from "../../../assets/passenger/sights/town1/Town1Sight1.webp";
import Town1Sight2 from "../../../assets/passenger/sights/town1/Town1Sight2.webp";
import Town1Sight3 from "../../../assets/passenger/sights/town1/Town1Sight3.webp";

import Town2Sight1 from "../../../assets/passenger/sights/town2/Town2Sight1.webp";
import Town2Sight2 from "../../../assets/passenger/sights/town2/Town2Sight2.webp";
import Town2Sight3 from "../../../assets/passenger/sights/town2/Town2Sight3.webp";

import Town3Sight1 from "../../../assets/passenger/sights/town3/Town3Sight1.webp";
import Town3Sight2 from "../../../assets/passenger/sights/town3/Town3Sight2.webp";
import Town3Sight3 from "../../../assets/passenger/sights/town3/Town3Sight3.webp";

export default function SightMenuScreen({
  onSelectSight,
  onBack,
  currentScenario,
}) {
  let sightsList = [
    {
      id: 1,
      image: Town1Sight1,
      name: "The Great Basilica",
      description:
        "Μια ιστορική βασιλική που χτίστηκε τον 14ο αιώνα. Φημίζεται για τα εντυπωσιακά ψηφιδωτά της και την πανοραμική θέα της πόλης από το καμπαναριό.",
    },
    {
      id: 2,
      image: Town1Sight2,
      name: "The Twin Towers",
      description:
        "Δύο δίδυμοι πύργοι που αποτελούν σύμβολο της σύγχρονης αρχιτεκτονικής της πόλης. Προσφέρουν μοναδική θέα στο λιμάνι.",
    },
    {
      id: 3,
      image: Town1Sight3,
      name: "The Endless Arches",
      description:
        "Ένας αρχαιολογικός χώρος γεμάτος με αψίδες που εκτείνονται για χιλιόμετρα. Ιδανικό μέρος για φωτογραφία και ιστορικούς περιπάτους.",
    },
  ];

  if (currentScenario) {
    if (currentScenario.includes("Town2")) {
      sightsList = [
        {
          id: 1,
          image: Town2Sight1,
          name: "The Gothic Cathedral",
          description:
            "Ένα αριστούργημα γοτθικής τέχνης με εντυπωσιακά βιτρό και γλυπτά που αφηγούνται την ιστορία της πόλης.",
        },
        {
          id: 2,
          image: Town2Sight2,
          name: "The Lady of the Lantern",
          description:
            "Ένα μυστηριώδες άγαλμα στην κεντρική πλατεία που, σύμφωνα με τον θρύλο, φωτίζει το δρόμο των χαμένων ταξιδιωτών.",
        },
        {
          id: 3,
          image: Town2Sight3,
          name: "Mercato Centrale",
          description:
            "Η κεντρική αγορά της πόλης, γεμάτη χρώματα, αρώματα και τοπικά προϊόντα. Το ιδανικό μέρος για γαστρονομικές εξερευνήσεις.",
        },
      ];
    } else if (currentScenario.includes("Town3")) {
      sightsList = [
        {
          id: 1,
          image: Town3Sight1,
          name: "The Music Pavilion",
          description:
            "Ένας χώρος αφιερωμένος στη μουσική και τις τέχνες, όπου πραγματοποιούνται καθημερινά συναυλίες κλασικής μουσικής.",
        },
        {
          id: 2,
          image: Town3Sight2,
          name: "The Ancient Amphitheater",
          description:
            "Ένα καλοδιατηρημένο αρχαίο θέατρο που χρησιμοποιείται ακόμη και σήμερα για παραστάσεις αρχαίου δράματος.",
        },
        {
          id: 3,
          image: Town3Sight3,
          name: "The Golden Gate",
          description:
            "Η ιστορική είσοδος της παλιάς πόλης, διακοσμημένη με φύλλα χρυσού που λάμπουν στο ηλιοβασίλεμα.",
        },
      ];
    }
  }

  return (
    <div className="container home-bg sights-screen">
      <h1 className="sights-title">Αξιοθέατα</h1>

      <div className="sights-grid">
        {sightsList.map((sight) => (
          <button
            key={sight.id}
            className="sight-card"
            onClick={() => onSelectSight(sight)}
            style={{
              backgroundImage: `url(${sight.image})`,
            }}
          >
            <div className="sight-card-label">{sight.name}</div>
          </button>
        ))}
      </div>

      <button className="btn-back sights-back-btn" onClick={onBack}>
        &larr; Επιστροφή
      </button>
    </div>
  );
}
