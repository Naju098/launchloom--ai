import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LoaderCircle, CheckCircle2 } from "lucide-react";


const steps = [
  "Understanding your business",
  "Creating a suitable business name",
  "Preparing your brand colours",
  "Organising your products",
  "Writing your website content",
  "Preparing customer messages",
  "Creating your enquiry system",
];

export default function DemoStep3Generation({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentStep >= steps.length) {
      setIsComplete(true);
      return;
    }
    const timer = setTimeout(() => setCurrentStep((prev) => prev + 1), 600);
    return () => clearTimeout(timer);
  }, [currentStep]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center text-center text-[var(--va-text)]"
    >
      <h2 className="text-xl font-black sm:text-2xl">
        Preparing your launch kit
      </h2>
      <p className="mt-2 text-base leading-7 text-[var(--va-text-secondary)]">
        LaunchLoom is preparing the parts you would normally need a designer,
        writer, marketer and sales assistant to create.
      </p>

      <div className="mt-8 w-full max-w-md space-y-3">
        {steps.map((step, i) => {
          const isActive = i === currentStep;
          const isDone = i < currentStep;
          return (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: isDone || isActive ? 1 : 0.3, x: 0 }}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left ${
                isActive
                  ? "bg-[var(--va-green-dim)] ring-1 ring-[var(--va-green)]/30"
                  : isDone
                    ? "bg-[var(--va-elevated)]"
                    : "bg-[var(--va-card)]"
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-[var(--va-green)]" />
              ) : isActive ? (
                <LoaderCircle className="h-5 w-5 shrink-0 animate-spin text-[var(--va-green)]" />
              ) : (
                <div className="h-5 w-5 shrink-0 rounded-full border-2 border-[var(--va-border)]" />
              )}
              <span
                className={`text-sm font-semibold ${
                  isDone
                    ? "text-[var(--va-text-muted)]"
                    : isActive
                      ? "text-[var(--va-green)]"
                      : "text-[var(--va-text-muted)]"
                }`}
              >
                {step}
              </span>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 flex flex-col items-center gap-3"
          >
            <p className="text-sm font-semibold text-[var(--va-green)]">
              Your launch kit is ready!
            </p>
            <motion.button
              type="button"
              onClick={onComplete}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-xl bg-[var(--va-green)] px-6 py-3 text-sm font-bold text-[var(--va-base)] shadow-lg transition-all hover:brightness-110"
            >
              Continue
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
