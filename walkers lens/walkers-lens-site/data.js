/* ========== EDIT YOUR BUSINESS DETAILS AND PRICES HERE ========== */
const SITE = {
  name: "Walker's Lens",
  whatsapp: "233247781951",            // 024 778 1951 in international format (Ghana, +233)
  phone: "024 778 1951",
  email: "walkerslens1951@gmail.com",
  instagram: "https://www.instagram.com/walkers._lens",
  tiktok: "https://www.tiktok.com/@walkers._lens",
  deposit: 1000
};

const CREW1 = "1 photographer · 1 videographer", CREW2 = "2 photographers · 1 videographer";
const COVER = ["Photos & video coverage", "Bride dress-up", "Exclusive photoshoot"];
const COVER_PLUS = ["Photos & video coverage", "Bridal shower", "Bride & groom dress-up", "Exclusive photoshoot"];

/* prices: one entry for a single price, two entries (1 day / 2 days) where the rate card has both */
const WEDDINGS = [
  { id: "only", title: "Traditional or White Wedding Only",
    text: "Photo and video coverage of your traditional or white wedding ceremony.",
    packages: [
      { id: "essential", img: "images/wedding-horse.jpg", alt: "Couple in black traditional attire leading a white horse", pos: "center 45%", name: "Essential Package", crew: CREW1, prices: [{ amount: 3500 }], cover: COVER,
        deliver: ["One photo frame (16x20)", "15 highly retouched photos", "Full video", "All photos on pendrive"] },
      { id: "classic", img: "images/wedding-beaded-door.jpg", alt: "Woman in a beaded sheer gown beside a wooden door", pos: "center 12%", name: "Classic Package", crew: CREW1, prices: [{ amount: 4500 }], cover: COVER,
        deliver: ["Photobook (A4, 50 pages)", "Two photo frames (16x20)", "25 highly retouched photos", "Full video with trailer", "All photos on pendrive"] },
      { id: "luxury", img: "images/wedding-kente.jpg", alt: "Couple in gold and kente traditional wedding attire", pos: "center 25%", name: "Luxury Package", crew: CREW1, prices: [{ label: "1 day", amount: 5000 }, { label: "2 days", amount: 6500 }], cover: COVER,
        deliver: ["Pre-wedding (10 photos)", "Photobook (A4, 50 pages)", "Two photo frames (16x20)", "20 highly retouched photos", "Full video with trailer", "All photos on pendrive"] },
      { id: "royal", img: "images/wedding-staircase.jpg", alt: "Couple in white on a curved staircase", pos: "center 30%", name: "Royal Package", crew: CREW2, prices: [{ label: "1 day", amount: 6500 }, { label: "2 days", amount: 8000 }], cover: COVER,
        deliver: ["Pre-wedding video & 20 pictures", "Photobook (A3, 50 pages)", "Two photo frames (20x24)", "35 highly retouched photos", "Full video with trailer", "All photos on pendrive"] }
    ] },
  { id: "reception", title: "Traditional or White Wedding With Reception",
    text: "Photo and video coverage of your wedding ceremony and your reception.",
    packages: [
      { id: "signature", img: "images/wedding-red.jpg", alt: "Couple in red traditional wedding attire", pos: "center 25%", name: "Signature Package", crew: CREW1, prices: [{ label: "1 day", amount: 5000 }, { label: "2 days", amount: 6500 }], cover: COVER,
        deliver: ["Pre-wedding (10 photos)", "Photobook (A4, 50 pages)", "Two photo frames (16x20)", "20 highly retouched photos", "Full video with trailer", "All photos on pendrive"] },
      { id: "premium", img: "images/wedding-lace.jpg", alt: "Bride in a white lace gown with a satin overskirt", pos: "center 14%", name: "Premium Package", crew: CREW2, prices: [{ label: "1 day", amount: 6500 }, { label: "2 days", amount: 8000 }], cover: COVER,
        deliver: ["Pre-wedding video & 20 pictures", "Photobook (A3, 50 pages)", "Two photo frames (20x24)", "35 highly retouched photos", "Full video with trailer", "All photos on pendrive"] },
      { id: "elite", img: "images/wedding-fans.jpg", alt: "Bride laughing among bridesmaids holding purple fans", pos: "center 30%", name: "Elite Package", crew: CREW2, prices: [{ label: "1 day", amount: 7000 }, { label: "2 days", amount: 8500 }], cover: COVER_PLUS,
        deliver: ["Pre-wedding video & 20 photos", "Photobook (A3, 50 pages)", "Three photo frames (one 16x20, two 20x24)", "35 highly retouched photos", "Full video with trailer", "All photos on pendrive"] },
      { id: "platinum", img: "images/wedding-gold.jpg", alt: "Couple in gold traditional attire in a grand room", pos: "center 35%", name: "Prestige Platinum Package", crew: CREW2, prices: [{ label: "1 day", amount: 8500 }, { label: "2 days", amount: 10000 }], cover: COVER_PLUS,
        deliver: ["Pre-wedding video & 30 pictures", "Photobook (A3, 50 pages)", "Four photo frames (20x24)", "50 highly retouched photos", "Full video with trailer", "All photos on pendrive", "Reels"] }
    ] }
];

const DINING = [
  { id: "dine1", name: "Package 1", prices: [{ amount: 3500 }], deliver: ["Exclusive photoshoot", "Photobook (A4, 20 pages)", "One frame (16x20)", "Video coverage"] },
  { id: "dine2", name: "Package 2", prices: [{ amount: 4500 }], deliver: ["Exclusive photoshoot", "Photobook (A4, 50 pages)", "Two frames (16x20)", "Video coverage with trailer video"] },
  { id: "dine3", name: "Package 3", prices: [{ amount: 6000 }], deliver: ["Exclusive photoshoot", "Photobook (A3, 50 pages)", "Three frames (20x24)", "Video coverage with trailer video"] }
];

const DINING_INFO = { title: "Brunch, Lunch or Dinner Coverage", text: "Photo and video coverage for your celebration meal, from a simple shoot to a full photobook set.",
  images: [{ src: "images/dinner-white-dress.jpg", alt: "Woman in a white gown standing in an elegant restaurant" },
    { src: "images/evening-friends.jpg", alt: "Two friends in blue evening dresses sharing a playful moment at a night out" }] };

const ADDONS = [
  { group: "Photography", items: [["Pre-wedding photos", 1000], ["Court signing photos", 1000], ["Bachelorette party", 1000], ["Bridal shower", 1000]] },
  { group: "Videography", items: [["Pre-wedding video", 800], ["Court signing video", 1000], ["Drone services", 1500]] },
  { group: "Photobook", items: [["Photobook A3", 1200], ["Photobook A4", 800]] },
  { group: "Frames", items: [["Frame A3", 400], ["Frame A4", 250]] }
];

/* Photography price list (60-minute sessions) */
const PRICELIST = {
  id: "pricelist", title: "Photography Price List", flyer: "images/price-list.jpg", flyerAlt: "Walker's Lens photography price list flyer",
  images: [{ src: "images/striped-dress.jpg", alt: "Woman seated on a sofa in a striped dress" }, { src: "images/white-blazer.jpg", alt: "Woman in a white blazer dress" }, { src: "images/plaid-cap.jpg", alt: "Person in a plaid shirt and cap" }],
  text: "Sessions for weddings, graduation, events, fashion, brand, creative work and modeling. Choose the package that fits you.",
  note: "Half payment secures your booking. Accommodation, transportation and delivery fees are not part of the packages and are charged separately. The client pays for transportation if travel is required. For weddings, see the wedding packages above.",
  packages: [
    { id: "pl1", name: "Basic Package One", label: "Photography session – Basic Package One", crew: "60-minute session", prices: [{ amount: 450 }],
      deliver: ["6 edited images", "4 retouched images", "Online gallery", "Print release"] },
    { id: "pl2", name: "Standard Package Two", label: "Photography session – Standard Package Two", crew: "60-minute session", prices: [{ amount: 700 }],
      deliver: ["12 edited images", "10 retouched images", "Online gallery", "Print release"] },
    { id: "pl3", name: "Premium Package Three", label: "Photography session – Premium Package Three", crew: "60-minute session", prices: [{ amount: 1200 }],
      deliver: ["20 edited images", "12 retouched images", "Online gallery", "Print release"] }
  ]
};

/* Graduate in Style (prices are the current offer; "was" is the crossed-out old price) */
const GRADUATION = {
  id: "graduation", title: "Graduate in Style", flyer: "images/graduate-in-style.jpg", flyerAlt: "Graduate in Style photography packages flyer",
  images: [{ src: "images/graduation-cap.jpg", alt: "Graduate in a cap and red kente dress" }, { src: "images/graduation-stairs.jpg", alt: "Graduate on a staircase holding a certificate and medal" }],
  text: "Capture the moment. Cherish the legacy. You did the work, now let's make the memories last forever. Limited slots available.",
  note: "Extra photo frames are available. The price is shared after booking.",
  packages: [
    { id: "gr1", name: "Basic Package", label: "Graduate in Style – Basic Package", crew: "10 pictures total", blurb: "Perfect for keeping your best moments.",
      prices: [{ amount: 350, was: 450 }], deliver: ["6 professionally edited images", "4 professionally retouched images", "Soft copies provided"] },
    { id: "gr2", name: "Standard Package", label: "Graduate in Style – Standard Package", crew: "22 pictures total", blurb: "More moments. More memories. The perfect balance.",
      prices: [{ amount: 550, was: 700 }], deliver: ["12 professionally edited images", "10 professionally retouched images", "Soft copies provided"] },
    { id: "gr3", name: "Premium Package", label: "Graduate in Style – Premium Package", crew: "32 pictures total", blurb: "The ultimate collection for unforgettable memories.",
      prices: [{ amount: 950, was: 1200 }], deliver: ["20 professionally edited images", "12 professionally retouched images", "Soft copies provided"] }
  ]
};

const TERMS = [
  "Packages are fixed. Any change to a package may raise or lower the price.",
  "GHC 1,000 upfront secures your booking, and the balance is paid on the day of the programme. No initial payment, no booking, so your date can be taken by another couple.",
  "If the programme is cancelled, or the date or photographer changes, the initial payment is not refunded. If the date changes, the booking can be used within the next 4 months. Prices may be reviewed when necessary.",
  "Packages cover one day or two consecutive days. Thanksgiving service is not included.",
  "Accommodation, transportation and delivery fees are not part of the packages and are charged separately. So the team can perform at its best, we ask the client to provide a hotel room or guest house for rest, and transportation for all members of the Walker's Lens team.",
  "Every item in the chosen package is provided as stated. Tell us if you want anything done differently; additional tasks come with a cost.",
  "Items marked FREE are provided free. Transportation is paid if travel is required. Removing a free item does not change the price of the package.",
  "Deliverables are delivered between the second and sixth week after the programme. Photobooks are produced by a third party and take 4 to 8 weeks.",
  "Client files are kept on our system for 6 months. If a client loses the files, they can be provided again at a cost of GHC 300.",
  "Walker's Lens reserves the right to use images in its portfolio, on its website and on social media (Snapchat, Instagram, TikTok).",
  "The pre-wedding shoot is a complimentary service added to the packages, and clients are not obliged to use it. It should be done no later than 3 weeks before the event date. If the client decides not to use it, its value is not refunded or exchanged for another service. The client chooses the date and tells the team ahead of time.",
  "Making a payment means the client has read, understood and accepted these terms."
];
