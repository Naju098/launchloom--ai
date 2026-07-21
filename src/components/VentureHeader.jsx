import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BarChart3,
  Menu,
  X,
  LayoutDashboard,
  PlayCircle,
  Moon,
  Sun,
  Sparkles,
} from "lucide-react";
import BrandLogo from "./BrandLogo";
import { useVentureMode } from "../context/VentureModeContext";

/* ── Magnetic nav button wrapper ── */
function MagneticNavButton({ children, onClick, className = "", isActive }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({
      x: (e.clientX - rect.left - rect.width / 2) * 0.1,
      y: (e.clientY - rect.top - rect.height / 2) * 0.1,
    });
  };

  const handleLeave = () => setPos({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.96 }}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

export default function VentureHeader({ currentView, onChangeView, leadCount, onOpenDemo }) {
  const { mode, toggleMode } = useVentureMode();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "studio", label: "Launch Studio", icon: LayoutDashboard },
    { id: "leads", label: "Lead Dashboard", icon: BarChart3, count: leadCount },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-[var(--va-border)] bg-[var(--va-panel)]/80 backdrop-blur-2xl shadow-lg shadow-black/10"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo with subtle hover animation */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <BrandLogo />
        </motion.div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1.5 lg:flex">
          <MagneticNavButton
            onClick={() => onOpenDemo()}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--va-magenta)]/30 bg-[var(--va-magenta-dim)] px-3 py-2 text-xs font-bold text-[var(--va-magenta)] transition-all hover:border-[var(--va-magenta)]/50 hover:shadow-lg hover:shadow-[var(--va-magenta)]/10"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Guided Demo
          </MagneticNavButton>

          <div className="mx-1.5 h-5 w-px bg-[var(--va-border)]" />

          {navItems.map(({ id, label, icon: Icon, count }) => (
            <MagneticNavButton
              key={id}
              onClick={() => onChangeView(id)}
              isActive={currentView === id}
              className={`relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition-all duration-200 ${
                currentView === id
                  ? "bg-[var(--va-green-dim)] text-[var(--va-green)] shadow-sm"
                  : "text-[var(--va-text-muted)] hover:bg-white/5 hover:text-[var(--va-text)]"
              }`}
            >
              {currentView === id && (
                <motion.span
                  layoutId="nav-active-indicator"
                  className="absolute inset-0 rounded-lg bg-[var(--va-green-dim)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Icon className="h-3.5 w-3.5" />
                {label}
                {count !== undefined && count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="rounded-full bg-[var(--va-coral)]/20 px-1.5 py-0.5 text-[9px] font-bold text-[var(--va-coral)]"
                  >
                    {count}
                  </motion.span>
                )}
              </span>
            </MagneticNavButton>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            onClick={toggleMode}
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            className="grid h-8 w-8 place-items-center rounded-lg text-[var(--va-text-muted)] transition-all hover:bg-white/5 hover:text-[var(--va-text)]"
            aria-label={`Switch to ${mode === "venture" ? "Focus" : "Venture"} mode`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {mode === "venture" ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          {/** Mobile menu toggle **/}
          <motion.button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            whileTap={{ scale: 0.9 }}
            className="grid h-8 w-8 place-items-center rounded-lg text-[var(--va-text-muted)] transition-all hover:bg-white/5 hover:text-[var(--va-text)] lg:hidden"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={mobileOpen ? "close" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
            transition={{ duration: 0.2 }}
            className="border-t border-[var(--va-border)] bg-[var(--va-panel)]/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-3">
              <button
                type="button"
                onClick={() => {
                  onOpenDemo();
                  setMobileOpen(false);
                }}
                className="flex items-center gap-2.5 rounded-lg border border-[var(--va-magenta)]/30 bg-[var(--va-magenta-dim)] px-4 py-3 text-sm font-bold text-[var(--va-magenta)] transition-all hover:shadow-lg"
              >
                <Sparkles className="h-4 w-4" />
                Guided Demo
              </button>

              <div className="my-1 h-px bg-[var(--va-border)]" />

              {navItems.map(({ id, label, icon: Icon, count }, i) => (
                <motion.button
                  key={id}
                  type="button"
                  onClick={() => {
                    onChangeView(id);
                    setMobileOpen(false);
                  }}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex items-center gap-2.5 rounded-lg px-4 py-3 text-sm font-semibold transition ${
                    currentView === id
                      ? "bg-[var(--va-green-dim)] text-[var(--va-green)]"
                      : "text-[var(--va-text-muted)] hover:bg-white/5 hover:text-[var(--va-text)]"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                  {count !== undefined && count > 0 && (
                    <span className="rounded-full bg-[var(--va-coral)]/20 px-1.5 py-0.5 text-[10px] font-bold text-[var(--va-coral)]">
                      {count}
                    </span>
                  )}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
