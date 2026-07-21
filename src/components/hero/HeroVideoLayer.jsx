import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

const slides = [
  {
    id: "brand",
    label: "BRAND IDENTITY",
    title: "Reboot Kochi",
    subtitle: "Reliable laptops. Smarter prices.",
    color: "from-[#E9407F] to-[#A855F7]",
  },
  {
    id: "products",
    label: "PRODUCT CATALOGUE",
    title: "12 Premium Laptops",
    subtitle: "Dell, HP, Lenovo — inspected & certified",
    color: "from-[#06B6D4] to-[#A855F7]",
  },
  {
    id: "website",
    label: "WEBSITE STRUCTURE",
    title: "7 Landing Sections",
    subtitle: "Hero · Trust · Products · Reviews · CTA",
    color: "from-[#F59E0B] to-[#E9407F]",
  },
  {
    id: "chat",
    label: "SALES CHATBOT",
    title: "AI-Powered Responses",
    subtitle: "Qualifies leads in under 2 minutes",
    color: "from-[#7C3AED] to-[#06B6D4]",
  },
];

export default function HeroVideoLayer({ className = "" }) {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
      setProgress(0);
    }, 3500);

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 1, 100));
    }, 35);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, []);

  const slide = slides[current];

  return (
    <div className={`relative flex items-center justify-center overflow-hidden bg-[var(--va-elevated)] ${className}`}>
      {/* Animated gradient background */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${slide.color} opacity-[0.08]`}
        key={slide.id + "-bg"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.08 }}
        transition={{ duration: 0.6 }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex flex-col items-center px-6 text-center"
        >
          {/* Label badge */}
          <span className="mb-3 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--va-text-muted)] backdrop-blur-sm">
            {slide.label}
          </span>

          {/* Main title */}
          <h3 className="text-2xl font-black tracking-tight text-[var(--va-text)] sm:text-3xl">
            {slide.title}
          </h3>

          {/* Subtitle */}
          <p className="mt-2 max-w-xs text-xs leading-5 text-[var(--va-text-secondary)]">
            {slide.subtitle}
          </p>

          {/* Decorative elements */}
          <div className="mt-5 flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: `var(--va-magenta)` }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/5">
        <motion.div
          className="h-full"
          style={{ background: "var(--va-magenta)" }}
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
      </div>

      {/* Bottom-right branding */}
      <div className="absolute bottom-3 right-4 text-[8px] font-semibold uppercase tracking-[0.15em] text-[var(--va-text-muted)]">
        LaunchLoom AI
      </div>
    </div>
  );
}
