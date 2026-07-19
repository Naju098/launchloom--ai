import { motion } from "motion/react";
import useCountUp from "../hooks/useCountUp";

const metrics = [
  { value: 18, suffix: "+", label: "Launch assets generated", desc: "Brand identity, catalogue, scripts, and more", accent: "text-[var(--va-green)]" },
  { value: 8, suffix: " min", label: "Average setup time", desc: "From idea to complete launch kit", accent: "text-[var(--va-teal)]" },
  { value: 6, suffix: "", label: "Sales channels supported", desc: "Web, chat, WhatsApp, email, and CRM", accent: "text-[var(--va-amber)]" },
  { value: 1, suffix: "", label: "Complete launch workflow", desc: "One platform, one process, one launch", accent: "text-[var(--va-coral)]" },
];

function AnimatedMetric({ value, suffix, label, desc, accent }) {
  const count = useCountUp(value);
  return (
    <div className="text-center">
      <p className={`text-5xl font-black ${accent} sm:text-6xl`}>
        {count}
        {suffix && <span className="text-3xl font-bold sm:text-4xl">{suffix}</span>}
      </p>
      <p className="mt-2 text-base font-bold text-[var(--va-text)]">{label}</p>
      <p className="mt-1 text-sm text-[var(--va-text-muted)]">{desc}</p>
    </div>
  );
}

export default function MetricsSection() {
  return (
    <section id="metrics" className="border-y border-[var(--va-border)] bg-[var(--va-panel)]/50">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--va-green)]">
            Product metrics
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-[var(--va-text)] sm:text-4xl">
            What LaunchLoom delivers
          </h2>
          <p className="mt-3 text-base leading-7 text-[var(--va-text-secondary)]">
            Workflow indicators from the demo — connect your data source for real-time metrics.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <AnimatedMetric {...metric} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
