import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import {
  Palette,
  Package,
  LayoutTemplate,
  Bot,
  MessageCircleMore,
  Users,
} from "lucide-react";

const stages = [
  {
    id: "brand",
    icon: Palette,
    label: "Brand Identity",
    items: [
      { label: "Business Name", value: "Reboot Kochi" },
      { label: "Tagline", value: "Reliable laptops. Smarter prices." },
      { label: "Colours", value: "5-palette generated" },
    ],
    color: "var(--va-teal)",
  },
  {
    id: "products",
    icon: Package,
    label: "Product Match",
    items: [
      { label: "Inventory", value: "12 laptops" },
      { label: "Price Range", value: "₹18,000 – ₹45,000" },
      { label: "Top Match", value: "Dell Latitude 5420" },
    ],
    color: "var(--va-amber)",
  },
  {
    id: "website",
    icon: LayoutTemplate,
    label: "Website Plan",
    items: [
      { label: "Sections", value: "7 ready" },
      { label: "CTAs", value: "Book a call, Buy now" },
      { label: "Structure", value: "Hero → Trust → CTA" },
    ],
    color: "var(--va-coral)",
  },
  {
    id: "chatbot",
    icon: Bot,
    label: "AI Chatbot",
    items: [
      { label: "Scripts", value: "4 conversations" },
      { label: "Tone", value: "Friendly + professional" },
      { label: "Qualification", value: "Automatic scoring" },
    ],
    color: "var(--va-violet)",
  },
  {
    id: "whatsapp",
    icon: MessageCircleMore,
    label: "WhatsApp Flow",
    items: [
      { label: "Messages", value: "3-sequence" },
      { label: "Timing", value: "Immediate + 1d + 3d" },
      { label: "Integration", value: "Click-to-WhatsApp" },
    ],
    color: "var(--va-green)",
  },
  {
    id: "leads",
    icon: Users,
    label: "Lead Dashboard",
    items: [
      { label: "Captured", value: "8 leads" },
      { label: "Hot Leads", value: "3 ready" },
      { label: "Conversion", value: "Tracked by status" },
    ],
    color: "var(--va-amber)",
  },
];

export default function DribbbleAnimation({ className = "" }) {
  const [currentStage, setCurrentStage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentStage((prev) => (prev + 1) % stages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const stage = stages[currentStage];
  const Icon = stage.icon;

  return (
    <div
      className={`relative flex items-center justify-center bg-[var(--va-base)] ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Animated dot grid in background */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(5)].map((_, row) => (
          <div key={row} className="flex gap-4">
            {[...Array(8)].map((_, col) => (
              <motion.div
                key={`${row}-${col}`}
                className="h-1 w-1 rounded-full"
                style={{ background: stage.color }}
                animate={{
                  opacity: [0.03, 0.1, 0.03],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 3 + row + col,
                  repeat: Infinity,
                  delay: (row * 8 + col) * 0.1,
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Main content card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={stage.id}
          initial={{ opacity: 0, scale: 0.92, filter: "blur(6px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.92, filter: "blur(6px)" }}
          transition={{ duration: 0.5 }}
          className="relative z-10 mx-auto w-[85%] max-w-sm rounded-2xl border border-white/10 bg-[var(--va-panel)]/90 p-5 shadow-2xl backdrop-blur-xl"
        >
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <motion.div
              className="grid h-8 w-8 place-items-center rounded-lg"
              style={{ background: `${stage.color}20`, color: stage.color }}
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Icon className="h-4 w-4" />
            </motion.div>
            <div>
              <p className="text-xs font-bold text-[var(--va-text)]">{stage.label}</p>
              <p className="text-[9px] text-[var(--va-text-muted)]">Live preview</p>
            </div>
            <motion.span
              className="ml-auto flex h-2 w-2 rounded-full"
              style={{ background: stage.color }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>

          {/* Items */}
          <div className="mt-3 space-y-2">
            {stage.items.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.3 }}
                className="flex items-center justify-between rounded-lg bg-white/[0.03] px-3 py-2"
              >
                <span className="text-[10px] font-semibold text-[var(--va-text-muted)]">
                  {item.label}
                </span>
                <span
                  className="text-[10px] font-bold"
                  style={{ color: stage.color }}
                >
                  {item.value}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Progress dots */}
          <div className="mt-4 flex justify-center gap-1.5">
            {stages.map((_, i) => (
              <motion.div
                key={i}
                className="h-1 rounded-full"
                style={{ background: i === currentStage ? stage.color : "rgba(255,255,255,0.1)" }}
                animate={{ width: i === currentStage ? 20 : 6 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Hover pause indicator */}
      {isPaused && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-3 left-3 rounded-full bg-white/10 px-2 py-0.5 text-[8px] font-bold text-[var(--va-text-muted)]"
        >
          Paused
        </motion.div>
      )}
    </div>
  );
}
