import { useState } from "react";
import { motion } from "motion/react";
import {
  Palette,
  Target,
  LayoutTemplate,
  CheckCircle2,
  Copy,
  Sparkles,
} from "lucide-react";
import { demoBrandOutput } from "../data/demoData";
import useCountUp from "../hooks/useCountUp";

function BrandMetric({ value, label, suffix = "" }) {
  const count = useCountUp(Number(value));
  return (
    <div className="text-center group">
      <motion.p
        className="text-2xl font-black text-[var(--va-text)]"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        {count}
        {suffix && <span className="text-sm font-semibold text-[var(--va-text-muted)]"> {suffix}</span>}
      </motion.p>
      <p className="text-xs font-semibold text-[var(--va-text-muted)]">{label}</p>
    </div>
  );
}

function Card3D({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateX: 5 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -6, scale: 1.01 }}
      className={`border-glow venture-card rounded-2xl transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function BrandShowcase() {
  const data = demoBrandOutput;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`${data.brandName}\n${data.tagline}\n${data.positioning}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="showcase" className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
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
          transition={{ duration: 0.3, delay: 0.05 }}
          className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--va-green)]"
        >
          Generated brand showcase
        </motion.p>
        <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-[var(--va-text)] sm:text-4xl">
          See <span className="text-gradient-magenta">LaunchLoom</span> in action
        </h2>
        <p className="mt-3 text-base leading-7 text-[var(--va-text-secondary)]">
          A complete brand system generated for a used-laptop store in Kochi.
        </p>
      </motion.div>

      <div className="mt-10 grid gap-5 lg:grid-cols-12">
        {/* Main brand card */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -4 }}
          className="relative overflow-hidden rounded-2xl bg-[var(--va-base)] p-6 text-white shadow-lg sm:p-8 lg:col-span-7"
        >
          {/* Animated background blobs */}
          <motion.div
            className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[var(--va-green)]/10 blur-3xl"
            animate={{ scale: [1, 1.2, 1], x: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-[var(--va-amber)]/5 blur-3xl"
            animate={{ scale: [1, 1.3, 1], y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <p className="relative text-xs font-black uppercase tracking-[0.2em] text-[var(--va-green)]">
            Brand identity
          </p>
          <h3 className="relative mt-4 text-3xl font-black tracking-tight sm:text-4xl">
            {data.brandName}
          </h3>
          <p className="relative mt-2 text-lg font-semibold text-gradient-teal">
            {data.tagline}
          </p>
          <p className="relative mt-4 max-w-2xl text-sm leading-6 text-[var(--va-text-muted)]">
            {data.positioning}
          </p>
          <motion.button
            type="button"
            onClick={handleCopy}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="relative mt-5 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-white/20 hover:shadow-lg"
          >
            {copied ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5 text-[var(--va-green)]" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copy positioning
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Metrics panel */}
        <Card3D className="p-6 lg:col-span-5" delay={0.1}>
          <p className="text-xs font-black uppercase tracking-[0.17em] text-[var(--va-text-muted)]">
            Launch metrics
          </p>
          <div className="mt-5 grid grid-cols-2 gap-4">
            <BrandMetric value="94" label="Brand score" />
            <BrandMetric value="18" label="Total assets" />
            <BrandMetric value="8" label="Launch time" suffix="min" />
            <BrandMetric value="3" label="Audiences" />
          </div>
        </Card3D>

        {/* Colour palette */}
        <Card3D className="p-6 lg:col-span-4" delay={0.15}>
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--va-teal)]/10 text-[var(--va-teal)]">
              <Palette className="h-4 w-4" />
            </div>
            <p className="text-sm font-bold text-[var(--va-text)]">Colour palette</p>
          </div>
          <div className="mt-4 space-y-2.5">
            {data.palette.map((colour, i) => (
              <motion.div
                key={colour.hex}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 group"
              >
                <motion.div
                  className="h-8 w-8 rounded-lg shadow-inner ring-1 ring-white/10 cursor-pointer"
                  style={{ backgroundColor: colour.hex }}
                  whileHover={{ scale: 1.3, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                />
                <div>
                  <p className="text-sm font-semibold text-[var(--va-text)]">{colour.name}</p>
                  <p className="text-xs text-[var(--va-text-muted)]">{colour.hex}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card3D>

        {/* Target audience */}
        <Card3D className="p-6 lg:col-span-4" delay={0.2}>
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--va-amber)]/10 text-[var(--va-amber)]">
              <Target className="h-4 w-4" />
            </div>
            <p className="text-sm font-bold text-[var(--va-text)]">Target audience</p>
          </div>
          <div className="mt-4 space-y-3">
            {data.audiences.map((a, i) => (
              <motion.div
                key={a.name}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ x: 4, scale: 1.01 }}
                className="rounded-xl border border-[var(--va-border)] bg-[var(--va-elevated)] p-3 transition-all duration-200 hover:border-[var(--va-amber)]/20 hover:bg-[var(--va-amber)]/5"
              >
                <p className="text-sm font-bold text-[var(--va-text)]">{a.name}</p>
                <p className="mt-1 text-xs leading-5 text-[var(--va-text-secondary)]">{a.need}</p>
              </motion.div>
            ))}
          </div>
        </Card3D>

        {/* Landing sections */}
        <Card3D className="p-6 lg:col-span-4" delay={0.25}>
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--va-coral)]/10 text-[var(--va-coral)]">
              <LayoutTemplate className="h-4 w-4" />
            </div>
            <p className="text-sm font-bold text-[var(--va-text)]">Landing sections</p>
          </div>
          <div className="mt-4 space-y-2">
            {data.landingSections.slice(0, 4).map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ x: 6 }}
                className="flex items-center gap-3 rounded-xl bg-[var(--va-elevated)] px-3.5 py-2.5 transition-all duration-200 hover:bg-[var(--va-coral)]/5 hover:pl-4 cursor-default"
              >
                <span className="text-xs font-black text-[var(--va-green)]">0{i + 1}</span>
                <div>
                  <p className="text-sm font-semibold text-[var(--va-text)]">{s.title}</p>
                  <p className="text-xs text-[var(--va-text-muted)]">{s.cta}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card3D>
      </div>
    </section>
  );
}
