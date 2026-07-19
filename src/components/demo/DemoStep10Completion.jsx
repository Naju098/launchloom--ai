import { motion } from "motion/react";
import { CheckCircle2, Rocket, Eye, RotateCcw } from "lucide-react";

const items = [
  { value: "1", label: "Business name" },
  { value: "1", label: "Brand direction" },
  { value: "3", label: "Recommended products" },
  { value: "7", label: "Website sections" },
  { value: "1", label: "Chatbot script" },
  { value: "3", label: "WhatsApp messages" },
  { value: "1", label: "Customer enquiry system" },
];

export default function DemoStep10Completion({ onBuild, onExplore, onRestart }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center text-center text-[var(--va-text)]"
    >
      <div className="mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-[var(--va-green-dim)] text-[var(--va-green)]">
        <CheckCircle2 className="h-8 w-8" />
      </div>

      <h2 className="text-2xl font-black sm:text-3xl">
        That simple idea is now ready to launch
      </h2>

      <p className="mx-auto mt-3 max-w-md text-base leading-7 text-[var(--va-text-secondary)]">
        From a used-laptop shop in Kochi, LaunchLoom created everything a
        business needs to start selling.
      </p>

      <div className="mt-8 grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
        {items.map(({ value, label }) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + Math.random() * 0.2 }}
            className="venture-card rounded-xl p-4 text-center"
          >
            <p className="text-2xl font-black text-[var(--va-green)]">{value}</p>
            <p className="mt-1 text-xs font-semibold text-[var(--va-text-muted)]">{label}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <motion.button
          type="button"
          onClick={onBuild}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--va-green)] px-6 py-3.5 text-sm font-bold text-[var(--va-base)] shadow-lg shadow-[var(--va-green)]/20 transition-all hover:brightness-110"
        >
          <Rocket className="h-4 w-4" />
          Build this for my business
        </motion.button>

        <motion.button
          type="button"
          onClick={onExplore}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 rounded-xl border border-[var(--va-border)] bg-[var(--va-elevated)] px-6 py-3.5 text-sm font-bold text-[var(--va-text)] shadow-sm transition-all hover:border-[var(--va-border-hover)] hover:bg-[var(--va-card-hover)]"
        >
          <Eye className="h-4 w-4" />
          Explore the generated result
        </motion.button>

        <motion.button
          type="button"
          onClick={onRestart}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold text-[var(--va-text-muted)] transition-all hover:text-[var(--va-text)]"
        >
          <RotateCcw className="h-4 w-4" />
          Restart demo
        </motion.button>
      </div>
    </motion.div>
  );
}
