import { motion } from "motion/react";
import { Info } from "lucide-react";

export default function SimpleExplanation({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="mt-4 flex items-start gap-3 rounded-xl border border-[var(--va-green)]/10 bg-[var(--va-green-dim)]/30 px-4 py-3"
    >
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-[var(--va-green)]" />
      <div className="text-xs leading-5 text-[var(--va-text-secondary)]">
        {children}
      </div>
    </motion.div>
  );
}
