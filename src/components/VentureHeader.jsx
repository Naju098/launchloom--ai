import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BarChart3,
  Menu,
  X,
  LayoutDashboard,
  PlayCircle,
  Moon,
  Sun,
} from "lucide-react";
import BrandLogo from "./BrandLogo";
import { useVentureMode } from "../context/VentureModeContext";

export default function VentureHeader({ currentView, onChangeView, leadCount, onOpenDemo }) {
  const { mode, toggleMode } = useVentureMode();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: "studio", label: "Launch Studio", icon: LayoutDashboard },
    { id: "leads", label: "Lead Dashboard", icon: BarChart3, count: leadCount },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--va-border)] bg-[var(--va-panel)]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Left: Logo */}
        <BrandLogo />

        {/* Center: Navigation (desktop) */}
        <nav className="hidden items-center gap-1 lg:flex">
          {/* Guided Demo button (always visible) */}
          <motion.button
            type="button"
            onClick={() => onOpenDemo()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--va-magenta)]/30 bg-[var(--va-magenta-dim)] px-3 py-2 text-xs font-bold text-[var(--va-magenta)] transition hover:bg-[var(--va-magenta-dim)]"
          >
            <PlayCircle className="h-3.5 w-3.5" />
            Guided Demo
          </motion.button>

          {navItems.map(({ id, label, icon: Icon, count }) => (
            <motion.button
              key={id}
              type="button"
              onClick={() => onChangeView(id)}
              whileTap={{ scale: 0.96 }}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition ${
                currentView === id
                  ? "bg-[var(--va-green-dim)] text-[var(--va-green)]"
                  : "text-[var(--va-text-muted)] hover:text-[var(--va-text)]"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
              {count !== undefined && count > 0 && (
                <span className="rounded-full bg-[var(--va-coral)]/20 px-1.5 py-0.5 text-[9px] font-bold text-[var(--va-coral)]">
                  {count}
                </span>
              )}
            </motion.button>
          ))}
        </nav>

        {/* Right: Theme toggle + Mobile menu */}
        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            onClick={toggleMode}
            whileTap={{ scale: 0.9 }}
            className="grid h-8 w-8 place-items-center rounded-lg text-[var(--va-text-muted)] transition hover:bg-white/5 hover:text-[var(--va-text)]"
            aria-label={`Switch to ${mode === "venture" ? "Focus" : "Venture"} mode`}
          >
            {mode === "venture" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </motion.button>

          <motion.button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            whileTap={{ scale: 0.9 }}
            className="grid h-8 w-8 place-items-center rounded-lg text-[var(--va-text-muted)] transition hover:bg-white/5 hover:text-[var(--va-text)] lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-[var(--va-border)] bg-[var(--va-panel)] lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-3">
              <button
                type="button"
                onClick={() => {
                  onOpenDemo();
                  setMobileOpen(false);
                }}
                className="flex items-center gap-2.5 rounded-lg border border-[var(--va-magenta)]/30 bg-[var(--va-magenta-dim)] px-4 py-3 text-sm font-bold text-[var(--va-magenta)]"
              >
                <PlayCircle className="h-4 w-4" />
                Guided Demo
              </button>

              {navItems.map(({ id, label, icon: Icon, count }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    onChangeView(id);
                    setMobileOpen(false);
                  }}
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
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
