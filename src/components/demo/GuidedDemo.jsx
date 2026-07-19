import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import DemoStep1Welcome from "./DemoStep1Welcome";
import DemoStep2Business from "./DemoStep2Business";
import DemoStep3Generation from "./DemoStep3Generation";
import DemoStep4Brand from "./DemoStep4Brand";
import DemoStep5Catalogue from "./DemoStep5Catalogue";
import DemoStep6Website from "./DemoStep6Website";
import DemoStep7Chatbot from "./DemoStep7Chatbot";
import DemoStep8WhatsApp from "./DemoStep8WhatsApp";
import DemoStep9Leads from "./DemoStep9Leads";
import DemoStep10Completion from "./DemoStep10Completion";

const TOTAL_STEPS = 10;

const stepLabels = [
  "Welcome",
  "Business details",
  "Generation",
  "Brand identity",
  "Product catalogue",
  "Website structure",
  "Sales chatbot",
  "WhatsApp follow-up",
  "Customer enquiries",
  "Completion",
];

export default function GuidedDemo({ isOpen, onClose, onBuild, onExplore }) {
  const [step, setStep] = useState(0);
  const [generationDone, setGenerationDone] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isOpen) {
      setStep(0);
      setGenerationDone(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && step < TOTAL_STEPS - 1 && !(step === 2 && !generationDone)) {
        setStep((s) => s + 1);
      }
      if (e.key === "ArrowLeft" && step > 0) {
        setStep((s) => s - 1);
      }
    },
    [isOpen, step, generationDone, onClose],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const nextStep = () => {
    if (step < TOTAL_STEPS - 1) setStep((s) => s + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const restartDemo = () => {
    setStep(0);
    setGenerationDone(false);
  };

  const progressPercent = ((step + 1) / TOTAL_STEPS) * 100;

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/70 px-4 py-8 backdrop-blur-sm sm:items-center sm:py-12"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Guided demo"
    >
      <motion.div
        {...(prefersReducedMotion
          ? {}
          : {
              initial: { opacity: 0, scale: 0.97, y: 20 },
              animate: { opacity: 1, scale: 1, y: 0 },
              exit: { opacity: 0, scale: 0.97, y: 20 },
              transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
            })}
        className="relative w-full max-w-3xl rounded-2xl border border-[var(--va-border)] bg-[var(--va-panel)] shadow-2xl shadow-black/50"
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between border-b border-[var(--va-border)] px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${
                    i <= step ? "bg-[var(--va-green)]" : "bg-[var(--va-border)]"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-[var(--va-text-muted)]">
              Step {step + 1} of {TOTAL_STEPS}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-lg text-[var(--va-text-muted)] transition hover:bg-white/5 hover:text-[var(--va-text)]"
            aria-label="Close demo"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* ── Progress bar ── */}
        <div className="h-1 w-full bg-[var(--va-elevated)]">
          <motion.div
            className="h-full bg-[var(--va-green)]"
            initial={{ width: `${((step) / TOTAL_STEPS) * 100}%` }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </div>

        {/* ── Step label ── */}
        <div className="px-5 pt-5 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--va-green)]">
            {stepLabels[step]}
          </p>
        </div>

        {/* ── Step content ── */}
        <div className="px-5 pb-4 pt-3 sm:px-6 sm:pb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              {...(prefersReducedMotion
                ? {}
                : {
                    initial: { opacity: 0, x: 20 },
                    animate: { opacity: 1, x: 0 },
                    exit: { opacity: 0, x: -20 },
                    transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] },
                  })}
              className="text-[var(--va-text)]"
            >
              {step === 0 && <DemoStep1Welcome onStart={() => setStep(1)} />}
              {step === 1 && <DemoStep2Business />}
              {step === 2 && (
                <DemoStep3Generation onComplete={() => { setGenerationDone(true); nextStep(); }} />
              )}
              {step === 3 && <DemoStep4Brand />}
              {step === 4 && <DemoStep5Catalogue />}
              {step === 5 && <DemoStep6Website />}
              {step === 6 && <DemoStep7Chatbot />}
              {step === 7 && <DemoStep8WhatsApp />}
              {step === 8 && <DemoStep9Leads />}
              {step === 9 && (
                <DemoStep10Completion
                  onBuild={onBuild}
                  onExplore={onExplore}
                  onRestart={restartDemo}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Navigation footer ── */}
        {step < 9 && (
          <div className="flex items-center justify-between border-t border-[var(--va-border)] px-5 py-4 sm:px-6">
            <button
              type="button"
              onClick={step === 0 ? onClose : prevStep}
              className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                step === 0
                  ? "text-[var(--va-text-muted)] hover:text-[var(--va-text)]"
                  : "text-[var(--va-text-secondary)] hover:bg-white/5"
              }`}
              aria-label={step === 0 ? "Close demo" : "Previous step"}
            >
              <ChevronLeft className="h-4 w-4" />
              {step === 0 ? "Close" : "Back"}
            </button>

            {step !== 2 && (
              <button
                type="button"
                onClick={nextStep}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--va-green)] px-5 py-2.5 text-sm font-bold text-[var(--va-base)] shadow-sm transition hover:brightness-110"
                aria-label="Next step"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
