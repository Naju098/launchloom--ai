import { motion } from "motion/react";
import SimpleExplanation from "./SimpleExplanation";

const sections = [
  { label: "Main banner", desc: "Welcome message and main offer" },
  { label: "Why buy from us", desc: "Trust signals and guarantees" },
  { label: "Recommended laptops", desc: "Products matched to the customer" },
  { label: "Inspection and warranty", desc: "Quality process explained" },
  { label: "Customer reviews", desc: "What other buyers say" },
  { label: "WhatsApp enquiry", desc: "Quick contact button" },
  { label: "Contact and location", desc: "Address, phone and map" },
];

export default function DemoStep6Website() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="text-[var(--va-text)]"
    >
      <h2 className="text-xl font-black sm:text-2xl">
        Website sections LaunchLoom creates
      </h2>
      <p className="mt-2 text-base leading-7 text-[var(--va-text-secondary)]">
        These are the sections the business website should contain.
      </p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--va-border)] bg-[var(--va-card)] shadow-sm">
        <div className="flex items-center gap-2 border-b border-[var(--va-border)] bg-[var(--va-elevated)] px-4 py-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-amber-400" />
            <div className="h-3 w-3 rounded-full bg-green-400" />
          </div>
          <div className="mx-auto rounded-md bg-[var(--va-card)] px-4 py-1 text-[11px] text-[var(--va-text-muted)] shadow-sm">
            rebootkochi.com
          </div>
        </div>

        <div className="space-y-0.5 p-4">
          {sections.map((section, i) => (
            <motion.div
              key={section.label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
              className="flex items-center gap-3 rounded-lg px-3.5 py-3 transition-colors hover:bg-[var(--va-green-dim)]/30"
            >
              <div className={`h-8 w-1 shrink-0 rounded-full ${i === 0 ? "bg-[var(--va-green)]" : i === sections.length - 1 ? "bg-[var(--va-amber)]" : "bg-[var(--va-border)]"}`} />
              <div className="flex-1">
                <p className="text-sm font-semibold text-[var(--va-text)]">{section.label}</p>
                <p className="text-xs text-[var(--va-text-muted)]">{section.desc}</p>
              </div>
              <span className="text-xs font-semibold text-[var(--va-green)]">Section {i + 1}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <SimpleExplanation delay={0.5}>
        <p className="font-semibold">Why this is useful:</p>
        <p className="mt-1">You don&apos;t need to plan what goes on each page. LaunchLoom creates a complete website structure with the right sections already in place.</p>
      </SimpleExplanation>
    </motion.div>
  );
}
