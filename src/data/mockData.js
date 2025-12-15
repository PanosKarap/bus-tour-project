import shop1Icon from "../assets/passenger/shop1.svg";
import shop2Icon from "../assets/passenger/shop2.svg";
import shop3Icon from "../assets/passenger/shop3.svg";

// --- CATEGORY ICONS ---
import coffeeCatIcon from "../assets/passenger/coffee.svg";
import sandwichCatIcon from "../assets/passenger/sandwich.svg";
import pizzaCatIcon from "../assets/passenger/pizza.svg";
import sodaCatIcon from "../assets/passenger/soda.svg";

// =====================================================================
// --- EXISTING ICONS ---
import cappuccinoIcon from "../assets/passenger/coffee.svg";
import latteIcon from "../assets/passenger/coffee.svg";
import freddoIcon from "../assets/passenger/coffee.svg";
import coldbrewIcon from "../assets/passenger/coffee.svg";
import greekIcon from "../assets/passenger/coffee.svg";
import frappeIcon from "../assets/passenger/coffee.svg";

import clubIcon from "../assets/passenger/items/club.svg";
import toastIcon from "../assets/passenger/items/toast.svg";
import baguetteIcon from "../assets/passenger/items/baguette.svg";
import avocadoIcon from "../assets/passenger/items/avocadoToast.svg";
import wrapIcon from "../assets/passenger/items/wrap.svg";

import margaritaIcon from "../assets/passenger/items/margarita.svg";
import pepperoniIcon from "../assets/passenger/items/pepperoni.svg";
import specialIcon from "../assets/passenger/items/special.svg";
import veggieIcon from "../assets/passenger/items/veggie.svg";

import colaIcon from "../assets/passenger/items/cola.svg";
import orangeadeIcon from "../assets/passenger/items/orangeade.svg";
import waterIcon from "../assets/passenger/items/water.svg";
import juiceIcon from "../assets/passenger/items/juice.svg";
import lemonadeIcon from "../assets/passenger/items/lemonade.svg";
// =====================================================================

export const CATEGORIES = [
  { id: "coffee", name: "Καφές", icon: coffeeCatIcon },
  { id: "sandwich", name: "Σάντουιτς", icon: sandwichCatIcon },
  { id: "pizza", name: "Πίτσα", icon: pizzaCatIcon },
  { id: "soda", name: "Αναψυκτικό", icon: sodaCatIcon },
];

export const SHOPS_DATA = {
  // ==========================================================
  // SHOP 1: Urban Cafe
  // ==========================================================
  shop1: {
    id: "shop1",
    name: "Καφενείον",
    icon: shop1Icon,
    items: {
      coffee: [
        {
          id: 101,
          name: "Καπουτσίνο",
          price: "€4.50",
          image: cappuccinoIcon,
          desc: "Πλούσιος εσπρέσο με αφρόγαλα",
          options: [
            { label: "Μέγεθος", choices: ["Κανονικό", "Διπλό"] },
            {
              label: "Χαρμάνι",
              choices: ["Premium Blend", "Decaf", "Μονοποικιλιακός"],
            },
            {
              label: "Ζάχαρη",
              choices: [
                "Σκέτος",
                "Μέτριος",
                "Γλυκός",
                "Με Στέβια",
                "Με Μαύρη Ζάχαρη",
              ],
            },
            {
              label: "Γάλα",
              choices: ["Πλήρες", "Ελαφρύ", "Βρώμης", "Σόγιας"],
            },
            {
              label: "Έξτρα",
              choices: [
                "Κανέλα",
                "Σκόνη Σοκολάτας",
                "Σιρόπι Καραμέλα",
                "Σιρόπι Βανίλια",
              ],
            },
          ],
        },
        {
          id: 102,
          name: "Λάτε",
          price: "€5.00",
          image: latteIcon,
          desc: "Απαλός εσπρέσο με ζεστό γάλα",
          options: [
            { label: "Χαρμάνι", choices: ["Premium Blend", "Decaf"] },
            { label: "Ζάχαρη", choices: ["Σκέτος", "Μέτριος", "Γλυκός"] },
            {
              label: "Γάλα",
              choices: ["Πλήρες", "Βρώμης", "Αμυγδάλου", "Χωρίς Λακτόζη"],
            },
            {
              label: "Γεύση",
              choices: ["Κλασικό", "Φουντούκι", "Irish Cream"],
            },
          ],
        },
        {
          id: 106,
          name: "Εσπρέσο",
          price: "€2.80",
          image: coffeeCatIcon,
          desc: "Δυνατός και αρωματικός",
          options: [
            { label: "Είδος", choices: ["Μονός", "Διπλός"] },
            { label: "Χαρμάνι", choices: ["Premium", "Decaf"] },
            { label: "Ζάχαρη", choices: ["Σκέτος", "Μέτριος", "Γλυκός"] },
          ],
        },
      ],
      sandwich: [
        {
          id: 103,
          name: "Κλαμπ Σάντουιτς",
          price: "€7.50",
          image: clubIcon,
          desc: "Κοτόπουλο, μπέικον, μαρούλι, ντομάτα",
          options: [
            { label: "Ψωμί", choices: ["Λευκό", "Ολικής"] },
            {
              label: "Συνοδευτικό",
              choices: ["Τηγανητές Πατάτες", "Σαλάτα", "Πατάτες Country"],
            },
            {
              label: "Μαγιονέζα",
              choices: ["Κανονική", "Light", "Mustard Sauce", "Χωρίς"],
            },
            { label: "Αφαίρεση", choices: ["Χωρίς Μπέικον", "Χωρίς Ντομάτα"] },
          ],
        },
        {
          id: 107,
          name: "Τσιαπάτα Κοτόπουλο",
          price: "€5.80",
          image: sandwichCatIcon,
          desc: "Φιλέτο κοτόπουλο, παρμεζάνα, σως μουστάρδας",
          options: [
            { label: "Ζέσταμα", choices: ["Ναι", "Όχι"] },
            { label: "Έξτρα", choices: ["Καλαμπόκι", "Μπέικον"] },
          ],
        },
      ],
      pizza: [
        {
          id: 104,
          name: "Μαργαρίτα",
          price: "€9.00",
          image: margaritaIcon,
          desc: "Σάλτσα ντομάτας, μοτσαρέλα, βασιλικός",
          options: [
            { label: "Μέγεθος", choices: ["8 κομμάτια", "Γίγας 12 κομμάτια"] },
            {
              label: "Ζύμη",
              choices: ["Λεπτή", "Κανονική", "Γεμιστή με τυρί"],
            },
            {
              label: "Έξτρα Υλικά",
              choices: ["Φρέσκια Ντομάτα", "Έξτρα Μοτσαρέλα"],
            },
          ],
        },
        {
          id: 108,
          name: "4 Τυριά",
          price: "€11.50",
          image: margaritaIcon,
          desc: "Μοτσαρέλα, Γκοργκοντζόλα, Παρμεζάνα, Γκούντα",
          options: [
            { label: "Ζύμη", choices: ["Λεπτή", "Κανονική"] },
            { label: "Σως", choices: ["Λευκή Κρέμα", "Σάλτσα Ντομάτας"] },
          ],
        },
      ],
      soda: [
        {
          id: 105,
          name: "Κόλα",
          price: "€2.00",
          image: colaIcon,
          desc: "Κουτάκι 330ml",
          options: [{ label: "Τύπος", choices: ["Κανονική", "Zero", "Light"] }],
        },
        {
          id: 109,
          name: "Ice Tea",
          price: "€2.50",
          image: sodaCatIcon,
          desc: "Παγωμένο τσάι 330ml",
          options: [
            { label: "Γεύση", choices: ["Λεμόνι", "Ροδάκινο", "Πράσινο Τσάι"] },
          ],
        },
      ],
    },
  },

  // ==========================================================
  // SHOP 2: Green & Bean
  // ==========================================================
  shop2: {
    id: "shop2",
    name: "Η Γωνιά",
    icon: shop2Icon,
    items: {
      coffee: [
        {
          id: 201,
          name: "Φρέντο Εσπρέσο",
          price: "€3.50",
          image: freddoIcon,
          desc: "Παγωμένος εσπρέσο χτυπημένος",
          options: [
            {
              label: "Ποικιλία",
              choices: ["House Blend", "Ethiopia", "Colombia"],
            },
            {
              label: "Ζάχαρη",
              choices: [
                "Σκέτος",
                "Μέτριος",
                "Γλυκός",
                "Στέβια",
                "Σιρόπι Αγαύης",
              ],
            },
            { label: "Μέγεθος", choices: ["Κανονικό", "Large"] },
          ],
        },
        {
          id: 202,
          name: "Cold Brew",
          price: "€4.50",
          image: coldbrewIcon,
          desc: "Εκχύλιση 24 ωρών",
          options: [
            {
              label: "Προσθήκη",
              choices: ["Σκέτο", "Με αφρόγαλα", "Με Tonic"],
            },
          ],
        },
        {
          id: 208,
          name: "Flat White",
          price: "€4.20",
          image: coffeeCatIcon,
          desc: "Διπλός ριστρέτο με αφρόγαλα",
          options: [
            {
              label: "Γάλα",
              choices: ["Πλήρες", "Βρώμης", "Αμυγδάλου", "Αρακά (Sproud)"],
            },
          ],
        },
      ],
      sandwich: [
        {
          id: 203,
          name: "Τοστ Αβοκάντο",
          price: "€6.00",
          image: avocadoIcon,
          desc: "Προζυμένιο ψωμί με φρέσκο αβοκάντο",
          options: [
            {
              label: "Ψωμί",
              choices: ["Προζυμένιο", "Πολύσπορο", "Χωρίς Γλουτένη"],
            },
            {
              label: "Spiciness",
              choices: ["Καθόλου", "Λίγο Μπούκοβο", "Πολύ Καυτερό"],
            },
            {
              label: "Extra Protein",
              choices: ["Χωρίς", "Αυγό Ποσέ", "Καπνιστός Σολομός"],
            },
          ],
        },
        {
          id: 204,
          name: "Τοστ Γαλοπούλα",
          price: "€5.50",
          image: wrapIcon,
          desc: "Αραβική πίτα ολικής",
          options: [
            {
              label: "Άλειμμα",
              choices: ["Τυρί Κρέμα", "Χούμους", "Πέστο Βασιλικού"],
            },
            {
              label: "Λαχανικά",
              choices: ["Μαρούλι/Ντομάτα", "Σπανάκι", "Χωρίς Λαχανικά"],
            },
          ],
        },
        {
          id: 209,
          name: "Vegan Bagel",
          price: "€6.50",
          image: sandwichCatIcon,
          desc: "Με ψητά λαχανικά και χούμους",
          options: [],
        },
      ],
      pizza: [
        {
          id: 205,
          name: "Λαχανικών (Veggie)",
          price: "€11.00",
          image: veggieIcon,
          desc: "Πιπεριές, μανιτάρια, ελιές, κρεμμύδι",
          options: [
            {
              label: "Τυρί",
              choices: ["Μοτσαρέλα", "Vegan Cheese", "Χωρίς Τυρί"],
            },
            {
              label: "Βάση",
              choices: ["Σάλτσα Ντομάτας", "Σάλτσα BBQ", "Pesto"],
            },
          ],
        },
        {
          id: 210,
          name: "Truffle Mushroom",
          price: "€13.00",
          image: pizzaCatIcon,
          desc: "Λάδι τρούφας, άγρια μανιτάρια, θυμάρι",
          options: [{ label: "Κρούστα", choices: ["Λεπτή", "Γεμιστή"] }],
        },
      ],
      soda: [
        {
          id: 207,
          name: "Φυσικός Χυμός",
          price: "€4.00",
          image: juiceIcon,
          desc: "Φρεσκοστυμμένος",
          options: [
            {
              label: "Συνδυασμός",
              choices: [
                "Πορτοκάλι",
                "Ανάμεικτος Εποχής",
                "Μήλο-Καρότο-Πορτοκάλι",
                "Ρόδι",
              ],
            },
            { label: "Τζίντζερ", choices: ["Όχι", "Ναι"] },
          ],
        },
      ],
    },
  },

  // ==========================================================
  // SHOP 3: Το Στέκι
  // ==========================================================
  shop3: {
    id: "shop3",
    name: "Το Στέκι",
    icon: shop3Icon,
    items: {
      coffee: [
        {
          id: 301,
          name: "Ελληνικός Καφές",
          price: "€2.50",
          image: greekIcon,
          desc: "Παραδοσιακός στο μπρίκι",
          options: [
            { label: "Μέγεθος", choices: ["Μονός", "Διπλός"] },
            {
              label: "Γλυκύτητα",
              choices: [
                "Σκέτος",
                "Με ολίγη",
                "Μέτριος",
                "Γλυκός",
                "Βαρύς Γλυκός",
                "Πολλά Βαρύς",
              ],
            },
            {
              label: "Άρωμα",
              choices: ["Κλασικός", "Με Μαστίχα", "Με Κάρδαμο"],
            },
          ],
        },
        {
          id: 302,
          name: "Φραπέ",
          price: "€2.50",
          image: frappeIcon,
          desc: "Ο εθνικός μας καφές",
          options: [
            {
              label: "Γλυκύτητα",
              choices: ["Σκέτος", "Μέτριος", "Γλυκός", "Γλυκός με γάλα"],
            },
            { label: "Γάλα", choices: ["Χωρίς", "Λίγο", "Πολύ (Φραπόγαλο)"] },
            {
              label: "Χτύπημα",
              choices: ["Πολύ αφρό", "Λίγο αφρό", "Αχτύπητος"],
            },
          ],
        },
        {
          id: 310,
          name: "Σοκολάτα Ρόφημα",
          price: "€3.50",
          image: coffeeCatIcon,
          desc: "Ζεστή ή Κρύα",
          options: [
            { label: "Θερμοκρασία", choices: ["Ζεστή", "Κρύα"] },
            {
              label: "Γεύση",
              choices: ["Κλασική", "Λευκή", "Φράουλα", "Καραμέλα αλατισμένη"],
            },
            { label: "Σαντιγί", choices: ["Ναι", "Όχι"] },
          ],
        },
      ],
      sandwich: [
        {
          id: 303,
          name: "Τοστ Κλασικό",
          price: "€3.00",
          image: toastIcon,
          desc: "Ζαμπόν και τυρί ψημένο",
          options: [
            { label: "Ψωμί", choices: ["Λευκό", "Ολικής"] },
            { label: "Βούτυρο", choices: ["Ναι", "Όχι"] },
            { label: "Κόρα", choices: ["Με κόρα", "Χωρίς κόρα"] },
            {
              label: "Είδος",
              choices: ["Ζαμπόν-Τυρί", "Γαλοπούλα-Τυρί", "Μόνο Τυρί"],
            },
          ],
        },
        {
          id: 304,
          name: "Μπαγκέτα Χωριάτικη",
          price: "€4.50",
          image: baguetteIcon,
          desc: "Σαλάμι, φέτα, ντομάτα, ρίγανη",
          options: [
            { label: "Ζέσταμα", choices: ["Ναι", "Όχι"] },
            { label: "Έξτρα", choices: ["Ελιές", "Πιπεριά"] },
          ],
        },
        {
          id: 311,
          name: "Πεινιρλί",
          price: "€3.80",
          image: sandwichCatIcon,
          desc: "Χειροποίητο ζυμάρι",
          options: [
            {
              label: "Γέμιση",
              choices: ["Κασέρι-Μπέικον", "Κασέρι-Κιμάς", "4 Τυριά"],
            },
          ],
        },
      ],
      pizza: [
        {
          id: 305,
          name: "Πεπερόνι",
          price: "€10.50",
          image: pepperoniIcon,
          desc: "Πικάντικο σαλάμι",
          options: [{ label: "Καυτερό", choices: ["Κανονικό", "Έξτρα Τσίλι"] }],
        },
        {
          id: 306,
          name: "Σπέσιαλ",
          price: "€12.00",
          image: specialIcon,
          desc: "Ζαμπόν, μπέικον, πιπεριές, μανιτάρια",
          options: [
            {
              label: "Αφαίρεση",
              choices: ["Χωρίς Μανιτάρια", "Χωρίς Πιπεριές"],
            },
          ],
        },
        {
          id: 312,
          name: "Ελληνική Πίτσα",
          price: "€11.00",
          image: pizzaCatIcon,
          desc: "Φέτα, ελιές, κρεμμύδι, πιπεριά, ντομάτα",
          options: [{ label: "Ρίγανη", choices: ["Ναι", "Όχι"] }],
        },
      ],
      soda: [
        {
          id: 307,
          name: "Πορτοκαλάδα",
          price: "€2.00",
          image: orangeadeIcon,
          desc: "Ελληνική (Λουξ/ΕΨΑ)",
          options: [
            { label: "Τύπος", choices: ["Με ανθρακικό", "Χωρίς ανθρακικό"] },
          ],
        },
        {
          id: 308,
          name: "Λεμονάδα",
          price: "€2.00",
          image: lemonadeIcon,
          desc: "Ελληνική (Λουξ/ΕΨΑ)",
          options: [
            { label: "Τύπος", choices: ["Με ανθρακικό", "Χωρίς ανθρακικό"] },
          ],
        },
        {
          id: 313,
          name: "Βυσσινάδα",
          price: "€2.20",
          image: sodaCatIcon,
          desc: "Παραδοσιακό αναψυκτικό",
          options: [],
        },
        {
          id: 309,
          name: "Νερό 500ml",
          price: "€0.50",
          image: waterIcon,
          desc: "Εμφιαλωμένο",
          options: [
            { label: "Θερμοκρασία", choices: ["Παγωμένο", "Θερμ. Δωματίου"] },
          ],
        },
      ],
    },
  },
};
