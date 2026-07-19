// This file contains deterministic demo content.
// Replace it with live AI output once the Kimi backend endpoint is ready.
export const demoBrandOutput = {
  brandName: "Reboot Kochi",
  tagline: "Premium performance. Smarter prices.",
  positioning:
    "A trusted Kochi-based used laptop store offering professionally inspected business laptops, honest recommendations, clear warranties, and fast local support for students, professionals, and growing teams.",
  palette: [
    { name: "Midnight Ink", hex: "#172033" },
    { name: "Loom Teal", hex: "#0D9488" },
    { name: "Deep Indigo", hex: "#1E3A5F" },
    { name: "Cloud White", hex: "#F8FAFC" },
    { name: "Signal Amber", hex: "#F4B740" },
  ],
  audiences: [
    {
      name: "College students",
      need: "Reliable study laptops under a controlled budget",
    },
    {
      name: "Young professionals",
      need: "Premium business-class performance without new-device pricing",
    },
    {
      name: "Startups and offices",
      need: "Quality bulk laptops with warranty and local support",
    },
  ],
  catalogue: [
    {
      id: 1,
      name: "Dell Latitude 5420",
      category: "Best overall",
      specs: "Core i5 11th Gen · 16GB · 512GB SSD",
      price: "₹32,999",
      originalPrice: "₹68,000 new equivalent",
      badge: "Most recommended",
      gradient: "from-violet-100 via-white to-indigo-100",
      score: 96,
    },
    {
      id: 2,
      name: "Lenovo ThinkPad T490",
      category: "Best for work",
      specs: "Core i5 8th Gen · 16GB · 512GB SSD",
      price: "₹25,499",
      originalPrice: "Business-grade build",
      badge: "Office favourite",
      gradient: "from-slate-100 via-white to-cyan-100",
      score: 91,
    },
    {
      id: 3,
      name: "HP EliteBook 840 G6",
      category: "Best premium value",
      specs: "Core i5 8th Gen · 8GB · 256GB SSD",
      price: "₹23,999",
      originalPrice: "Slim aluminium body",
      badge: "Premium look",
      gradient: "from-amber-50 via-white to-orange-100",
      score: 89,
    },
  ],
  landingSections: [
    {
      title: "Hero",
      copy: "Certified used laptops in Kochi, matched to your work and budget.",
      cta: "Find my laptop",
    },
    {
      title: "Trust strip",
      copy: "40-point inspection · 7-day replacement · Up to 1-year warranty · Kochi support",
      cta: "See quality process",
    },
    {
      title: "Smart recommendations",
      copy: "Answer four questions and get the best three devices for your exact use case.",
      cta: "Get recommendations",
    },
    {
      title: "Product catalogue",
      copy: "Filter by budget, processor, RAM, screen size, and purpose.",
      cta: "Browse laptops",
    },
    {
      title: "Customer proof",
      copy: "Show buyer stories, review cards, office bulk orders, and device condition videos.",
      cta: "View customer stories",
    },
    {
      title: "Final conversion",
      copy: "Reserve a laptop through WhatsApp and visit the Kochi store for inspection.",
      cta: "Reserve on WhatsApp",
    },
  ],
  chatbotScript: [
    {
      sender: "bot",
      text: "Hi! I can help you choose a reliable used laptop in under two minutes. What will you mainly use it for?",
    },
    {
      sender: "user",
      text: "Coding, classes, and some design work.",
    },
    {
      sender: "bot",
      text: "Great. What is your maximum budget, and do you prefer portability or a bigger screen?",
    },
    {
      sender: "user",
      text: "Around ₹30,000. Portability is important.",
    },
    {
      sender: "bot",
      text: "The Dell Latitude 5420 is the strongest match. It gives you 16GB RAM, an 11th Gen processor, and a compact business-grade body. Would you like the condition video or a WhatsApp reservation link?",
    },
  ],
  whatsappMessages: [
    {
      timing: "Immediately",
      message:
        "Hi {{name}}, this is Reboot Kochi. Based on your requirement, the {{product}} looks like the best fit. I can send its inspection video, battery report, and final price here.",
    },
    {
      timing: "After 3 hours",
      message:
        "Just checking in, {{name}}. The laptop you viewed is still available. Would you like us to reserve it until this evening at no cost?",
    },
    {
      timing: "Next day",
      message:
        "Hi {{name}}, we also found one alternative close to your budget. Reply COMPARE and I will send a simple side-by-side comparison.",
    },
  ],
};
