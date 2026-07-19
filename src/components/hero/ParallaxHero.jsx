import { useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ArrowDown, CheckCircle2, PlayCircle, Target } from "lucide-react";
import usePointerParallax from "../../hooks/usePointerParallax";
import HeroVideoLayer from "./HeroVideoLayer";
import LaunchProgress from "../LaunchProgress";
import AnimatedParticles from "../AnimatedParticles";

export default function ParallaxHero({ onOpenDemo }) {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0.3]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0]);

  const videoY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.2]);
  const videoRotateX = useTransform(scrollYProgress, [0, 1], [0, 2]);
  const videoRotateY = useTransform(scrollYProgress, [0, 1], [0, -2]);

  const { rotateX, rotateY, handlers } = usePointerParallax({
    maxRotate: 4,
    damping: 0.08,
  });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[110vh] overflow-hidden pb-8 pt-14 sm:pb-12 sm:pt-24"
      style={{ zIndex: 1 }}
    >
      {/* Dark cinematic background */}
      <div className="pointer-events-none absolute inset-0 bg-[var(--va-base)]" />
      {/* Neon magenta ambient glow */}
      <div className="pointer-events-none absolute -right-32 top-0 h-[700px] w-[700px] rounded-full opacity-[0.12]"
        style={{ background: "radial-gradient(circle at 50% 50%, rgba(233, 64, 127, 0.2) 0%, transparent 70%)" }}
      />
      {/* Deep violet ambient glow left */}
      <div className="pointer-events-none absolute -left-20 top-0 h-[500px] w-[500px] rounded-full opacity-[0.08]"
        style={{ background: "radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.2) 0%, transparent 70%)" }}
      />
      {/* Grain texture */}
      <div className="bg-grain pointer-events-none absolute inset-0 opacity-[0.025]" />

      {/* Floating decorative particles */}
      <AnimatedParticles prefersReducedMotion={prefersReducedMotion} />

      <motion.div
        className="relative mx-auto grid max-w-7xl items-start gap-10 px-5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-8"
        style={{ opacity: prefersReducedMotion ? 1 : sectionOpacity }}
      >
        {/* ── Left column ── */}
        <motion.div
          className="relative z-10"
          style={{
            y: prefersReducedMotion ? 0 : textY,
            opacity: prefersReducedMotion ? 1 : textOpacity,
          }}
        >
          {/* Status label */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="mb-5 inline-flex items-center gap-2 rounded-lg border border-[var(--va-green)]/20 bg-[var(--va-green-dim)] px-3.5 py-2 text-[11px] font-bold tracking-[0.12em] text-[var(--va-green)]"
          >
            <Target className="h-3.5 w-3.5" />
            YOUR BUSINESS LAUNCH QUEST
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-3xl text-[clamp(1.75rem,4.5vw,3.5rem)] font-black leading-[1.08] tracking-[-0.03em] text-[var(--va-text)]"
          >
            Turn your idea into a business people can see, understand and buy from.
          </motion.h1>

          {/* Supporting text */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-4 max-w-xl text-base leading-7 text-[var(--va-text-secondary)] sm:text-lg sm:leading-8"
          >
            Tell LaunchLoom what you want to sell. It prepares your brand, products, website, customer messages and enquiry system in one guided experience.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <motion.a
              href="#brand-builder"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--va-magenta)] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[var(--va-magenta)]/30 transition-all hover:brightness-110 hover:shadow-xl"
            >
              {/* Animated glow ring behind button */}
              <AnimatePresence>
                {!prefersReducedMotion && (
                  <motion.span
                    className="pointer-events-none absolute inset-0 rounded-xl bg-[var(--va-magenta)]"
                    initial={{ opacity: 0.4, scale: 1 }}
                    animate={{ opacity: [0.4, 0.15, 0.4], scale: [1, 1.08, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    style={{ zIndex: -1 }}
                  />
                )}
              </AnimatePresence>
              Start my launch
              <ArrowDown className="h-4 w-4 relative" />
            </motion.a>

            <motion.button
              type="button"
              onClick={onOpenDemo}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--va-border)] bg-[var(--va-elevated)] px-6 py-3 text-sm font-semibold text-[var(--va-text)] shadow-sm transition-all hover:border-[var(--va-border-hover)] hover:bg-[var(--va-card-hover)]"
            >
              <PlayCircle className="h-4 w-4" />
              Play the guided demo
            </motion.button>
          </motion.div>

          {/* Trust text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-[var(--va-text-muted)]"
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-[var(--va-green)]" />
              No coding required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-[var(--va-green)]" />
              Built in a few minutes
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-[var(--va-green)]" />
              Everything remains editable
            </span>
          </motion.div>

          {/* Progress preview */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="mt-6 max-w-xs"
          >
            <LaunchProgress currentLevel={1} />
          </motion.div>
        </motion.div>

        {/* ── Right column: Video + overlays ── */}
        <div className="relative" {...handlers}>
          <motion.div
            className="relative mx-auto w-full max-w-[680px]"
            style={{
              y: prefersReducedMotion ? 0 : videoY,
              scale: prefersReducedMotion ? 1 : videoScale,
              rotateX: prefersReducedMotion ? 0 : videoRotateX + rotateX * 0.5,
              rotateY: prefersReducedMotion ? 0 : videoRotateY + rotateY * 0.5,
              opacity: prefersReducedMotion ? 1 : videoOpacity,
            }}
          >
            <div className="aspect-[16/9] w-full">
              <HeroVideoLayer className="h-full w-full" />
            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* Bottom fade cap */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--va-base)] to-transparent" />
    </section>
  );
}
