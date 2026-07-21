import { motion } from "motion/react";
import { ArrowRight, Eye, Rocket, Sparkles, Zap } from "lucide-react";

function FloatingOrb({ className, size = "h-64 w-64", color = "rgba(233, 64, 127, 0.12)", delay = 0 }) {
  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full ${size} ${className}`}
      style={{ background: `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 70%)` }}
      animate={{
        y: [0, -15, 0],
        x: [0, 8, -5, 0],
        scale: [1, 1.03, 0.98, 1],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

/* ── Magnetic button ── */
function MagneticCta({ children, className = "", as = "a", href, onClick }) {
  const Tag = as === "a" ? motion.a : motion.button;

  return (
    <Tag
      href={href}
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={className}
    >
      {children}
    </Tag>
  );
}

export default function FinalCTA({ onOpenDemo }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--va-panel)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--va-magenta)]/[0.04] via-transparent to-[var(--va-violet)]/[0.04]" />

      <FloatingOrb className="-right-32 -top-32" size="h-[500px] w-[500px]" color="rgba(233, 64, 127, 0.1)" delay={0} />
      <FloatingOrb className="-left-32 -bottom-32" size="h-[400px] w-[400px]" color="rgba(6, 182, 212, 0.06)" delay={2} />

      <div className="relative mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          {/* Animated rocket icon */}
          <motion.div
            animate={{
              y: [0, -6, 0],
              scale: [1, 1.05, 1],
              rotate: [0, -3, 3, 0],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-[var(--va-green-dim)] text-[var(--va-green)] shadow-lg shadow-[var(--va-green)]/10"
          >
            <Rocket className="h-7 w-7" />
          </motion.div>

          {/* Sparkle particles container */}
          <div className="relative">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="pointer-events-none absolute h-1.5 w-1.5 rounded-full"
                style={{ background: i % 2 === 0 ? "var(--va-magenta)" : "var(--va-teal)" }}
                initial={{ opacity: 0, x: 0, y: 0 }}
                animate={{
                  opacity: [0, 0.6, 0],
                  x: Math.cos((i * 60 * Math.PI) / 180) * 60,
                  y: Math.sin((i * 60 * Math.PI) / 180) * 60,
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.25,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>

          <h2 className="mt-6 text-3xl font-black tracking-tight text-[var(--va-text)] sm:text-4xl lg:text-5xl">
            Your idea is ready for its <span className="text-gradient-magenta">next level</span>.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[var(--va-text-secondary)] sm:text-lg sm:leading-8">
            Build the brand, products, website plan and sales system your business needs to begin.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <MagneticCta
              as="a"
              href="#brand-builder"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-[var(--va-magenta)] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[var(--va-magenta)]/30 transition-all hover:brightness-110 hover:shadow-xl"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              Start my launch
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </MagneticCta>

            <MagneticCta
              as="button"
              onClick={onOpenDemo}
              className="glass-edge inline-flex items-center gap-2 rounded-xl border border-[var(--va-border)] bg-[var(--va-elevated)] px-7 py-3.5 text-sm font-bold text-[var(--va-text)] backdrop-blur-sm transition-all hover:border-[var(--va-border-hover)] hover:bg-[var(--va-card-hover)] hover:shadow-lg"
            >
              <Sparkles className="h-4 w-4" />
              Replay guided demo
            </MagneticCta>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
