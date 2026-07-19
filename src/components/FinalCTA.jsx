import { motion } from "motion/react";
import { ArrowRight, Eye, Rocket } from "lucide-react";

export default function FinalCTA({ onOpenDemo }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--va-panel)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--va-magenta)]/[0.04] via-transparent to-[var(--va-violet)]/[0.04]" />
      <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full opacity-[0.1]"
        style={{ background: "radial-gradient(circle at 50% 50%, rgba(233, 64, 127, 0.25) 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-[var(--va-green-dim)] text-[var(--va-green)] shadow-lg shadow-[var(--va-green)]/10"
          >
            <Rocket className="h-7 w-7" />
          </motion.div>

          <h2 className="text-3xl font-black tracking-tight text-[var(--va-text)] sm:text-4xl lg:text-5xl">
            Your idea is ready for its next level.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[var(--va-text-secondary)] sm:text-lg sm:leading-8">
            Build the brand, products, website plan and sales system your business needs to begin.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <motion.a
              href="#brand-builder"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--va-magenta)] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[var(--va-magenta)]/30 transition-all hover:brightness-110 hover:shadow-xl"
            >
              Start my launch
              <ArrowRight className="h-4 w-4" />
            </motion.a>

            <motion.button
              type="button"
              onClick={onOpenDemo}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--va-border)] bg-[var(--va-elevated)] px-7 py-3.5 text-sm font-bold text-[var(--va-text)] backdrop-blur-sm transition-all hover:border-[var(--va-border-hover)] hover:bg-[var(--va-card-hover)]"
            >
              <Eye className="h-4 w-4" />
              Replay guided demo
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
