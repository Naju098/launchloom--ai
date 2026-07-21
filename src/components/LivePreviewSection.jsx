import { motion } from "motion/react";
import { Sparkles, MonitorPlay } from "lucide-react";
import DribbbleAnimation from "./hero/DribbbleAnimation";
import Reveal from "./Reveal";

export default function LivePreviewSection() {
  return (
    <section className="relative overflow-hidden border-y border-[var(--va-border)] bg-[var(--va-panel)]/30 py-16 sm:py-20">
      {/* Ambient glow */}
      <motion.div
        className="pointer-events-none absolute -left-32 top-0 h-[400px] w-[400px] rounded-full"
        style={{ background: "radial-gradient(circle at 50% 50%, rgba(233, 64, 127, 0.2) 0%, transparent 70%)" }}
        animate={{ opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full"
        style={{ background: "radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.2) 0%, transparent 70%)" }}
        animate={{ opacity: [0.02, 0.06, 0.02] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal variant="blur">
          <div className="mb-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-3 inline-flex items-center gap-2 rounded-lg border border-[var(--va-green)]/20 bg-[var(--va-green-dim)] px-3.5 py-2 text-[11px] font-bold tracking-[0.12em] text-[var(--va-green)]"
            >
              <MonitorPlay className="h-3.5 w-3.5" />
              LIVE LAUNCH PREVIEW
            </motion.div>

            <h2 className="text-[clamp(1.4rem,3vw,2.2rem)] font-black leading-[1.1] tracking-[-0.02em] text-[var(--va-text)]">
              See your brand dashboard in <span className="text-gradient-magenta">action</span>
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[var(--va-text-secondary)]">
              Watch LaunchLoom cycle through analyzing your business,
              creating brand identity, matching products, and activating
              your customer enquiry system.
            </p>
          </div>
        </Reveal>

        <Reveal variant="scale">
          <div className="mx-auto max-w-3xl">
            <div className="mb-4 flex items-center justify-center gap-3">
              <motion.span
                className="flex items-center gap-1.5 rounded-full bg-[var(--va-green-dim)] px-3 py-1 text-[10px] font-bold text-[var(--va-green)]"
                animate={{ boxShadow: ["0 0 0px rgba(233,64,127,0)", "0 0 8px rgba(233,64,127,0.2)", "0 0 0px rgba(233,64,127,0)"] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="h-3 w-3" />
                Animated dashboard
              </motion.span>
              <span className="flex items-center gap-1.5 rounded-full bg-[var(--va-panel)] px-3 py-1 text-[10px] font-bold text-[var(--va-text-muted)]">
                Hover to pause
              </span>
            </div>

            <div className="glass-edge overflow-hidden rounded-2xl">
              <div className="aspect-[16/10] w-full sm:aspect-[16/9]">
                <DribbbleAnimation className="h-full w-full" />
              </div>
            </div>

            <p className="mt-4 text-center text-[11px] font-semibold text-[var(--va-text-muted)]">
              The dashboard cycles through real LaunchLoom outputs —
              brand identity, product matching, and customer enquiries.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
