import { motion } from "motion/react";
import { ArrowUpRight, BadgeCheck, ShieldCheck, Cpu, HardDrive, Zap } from "lucide-react";
import LaptopVisual from "./LaptopVisual";

const productVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

function MagneticButton({ children, className = "" }) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

export default function ProductRecommendations({ products }) {
  return (
    <section className="mt-14">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: -6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--va-green)]"
        >
          Product inventory
        </motion.p>
        <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-[var(--va-text)] sm:text-4xl">
          Recommended equipment
        </h2>
        <p className="mt-3 text-base leading-7 text-[var(--va-text-secondary)]">
          Products matched to the demo audience, budget range, and main promise.
        </p>
      </motion.div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {products.map((product, index) => (
          <motion.article
            key={product.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={index * 0.08}
            variants={productVariants}
            whileHover={{ y: -8, scale: 1.01 }}
            className="border-glow venture-card group relative rounded-2xl p-4"
          >
            {/* Shimmer overlay */}
            <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 rounded-2xl bg-gradient-to-r from-transparent via-white/[0.03] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

            <LaptopVisual gradient={product.gradient} />

            <div className="relative p-2 pb-3 pt-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <motion.p
                    className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--va-green)]"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {product.category}
                  </motion.p>
                  <h3 className="mt-2 text-xl font-black text-[var(--va-text)] group-hover:text-gradient-magenta transition-all duration-300">
                    {product.name}
                  </h3>
                </div>
                {/* Score ring */}
                <motion.div
                  className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[var(--va-elevated)] transition-all duration-300 group-hover:bg-[var(--va-green-dim)]"
                  whileHover={{ scale: 1.1 }}
                >
                  <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 56 56">
                    <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
                    <motion.circle
                      cx="28" cy="28" r="24" fill="none"
                      stroke="var(--va-green)" strokeWidth="3"
                      strokeDasharray={`${(product.score / 100) * 151} 151`}
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: product.score / 100 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                    />
                  </svg>
                  <p className="relative text-sm font-black text-[var(--va-green)]">{product.score}%</p>
                </motion.div>
              </div>

              <p className="mt-3 text-sm leading-6 text-[var(--va-text-secondary)]">{product.specs}</p>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  [ShieldCheck, "Inspected"],
                  [Zap, "Tested"],
                  [HardDrive, "Fast SSD"],
                ].map(([Icon, label]) => (
                  <motion.div
                    key={label}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="rounded-xl bg-[var(--va-elevated)] px-2 py-3 text-center transition-all duration-200 hover:bg-[var(--va-green-dim)] cursor-default"
                  >
                    <Icon className="mx-auto h-4 w-4 text-[var(--va-text-muted)]" />
                    <p className="mt-1.5 text-[10px] font-bold text-[var(--va-text-muted)]">{label}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-5 flex items-end justify-between border-t border-[var(--va-border)] pt-4">
                <div>
                  <p className="text-2xl font-black text-[var(--va-text)]">{product.price}</p>
                  <p className="mt-1 text-xs text-[var(--va-text-muted)]">{product.originalPrice}</p>
                </div>
                <MagneticButton
                  className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--va-green-dim)] text-[var(--va-green)] transition-all duration-200 hover:bg-[var(--va-green)] hover:text-[var(--va-base)] hover:shadow-lg hover:shadow-[var(--va-green)]/20"
                  aria-label={`View ${product.name}`}
                >
                  <ArrowUpRight className="h-5 w-5" />
                </MagneticButton>
              </div>

              <motion.div
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[var(--va-green-dim)] px-3 py-1.5 text-xs font-bold text-[var(--va-green)]"
                whileHover={{ scale: 1.02, x: 2 }}
              >
                <BadgeCheck className="h-3.5 w-3.5" />
                {product.badge}
              </motion.div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
