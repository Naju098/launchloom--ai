import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ArrowDown, CheckCircle2, PlayCircle, Target, Sparkles } from "lucide-react";
import usePointerParallax from "../../hooks/usePointerParallax";
import HeroVideoLayer from "./HeroVideoLayer";
import ConnectionLines from "./ConnectionLines";
import LaunchProgress from "../LaunchProgress";
import AnimatedParticles from "../AnimatedParticles";

/* ── Word-by-word animated headline ── */
function AnimatedHeadline({ text, prefersReducedMotion }) {
  const words = text.split(" ");

  return (
    <h1 className="max-w-3xl text-[clamp(1.75rem,4.5vw,3.5rem)] font-black leading-[1.08] tracking-[-0.03em]">
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block text-[var(--va-text)]"
            initial={prefersReducedMotion ? false : { y: "100%", opacity: 0, rotateX: 30 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.15 + i * 0.05,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
      <motion.span
        className="inline-block text-gradient-magenta"
        initial={prefersReducedMotion ? false : { scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.15 + words.length * 0.05 + 0.2 }}
      >
        .
      </motion.span>
    </h1>
  );
}

/* ── Typing subtitle effect ── */
function TypingSubtitle({ text, delay = 0.8, prefersReducedMotion }) {
  const [displayed, setDisplayed] = useState(prefersReducedMotion ? text : "");

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayed(text);
      return;
    }
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 25);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [text, delay, prefersReducedMotion]);

  return (
    <p className="mt-4 max-w-xl text-base leading-7 text-[var(--va-text-secondary)] sm:text-lg sm:leading-8 typing-cursor">
      {displayed}
    </p>
  );
}

/* ── Floating 3D decorative orb ── */
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
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

/* ── Magnetic button wrapper ── */
function MagneticButton({ children, className = "", onClick, as = "button", href, ...props }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  const Tag = as === "a" ? motion.a : motion.button;

  return (
    <Tag
      ref={ref}
      onClick={onClick}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.1 }}
      className={className}
      {...props}
    >
      {children}
    </Tag>
  );
}

export default function ParallaxHero({ onOpenDemo }) {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mouseGlowVisible, setMouseGlowVisible] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Mouse tracking for ambient glow
  useEffect(() => {
    if (prefersReducedMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    let rafId = null;
    const handleMouseMove = (e) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
        setMouseGlowVisible(true);
      });
    };

    const handleMouseLeave = () => setMouseGlowVisible(false);

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion]);

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

      {/* Ambient mouse-following glow with rAF throttling */}
      {!prefersReducedMotion && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: mouseGlowVisible ? 1 : 0,
            transition: "opacity 0.5s",
            background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(233, 64, 127, 0.06) 0%, transparent 60%)`,
          }}
        />
      )}

      {/* Animated connection lines */}
      <ConnectionLines prefersReducedMotion={prefersReducedMotion} />

      {/* Floating decorative orbs */}
      {!prefersReducedMotion && (
        <>
          <FloatingOrb className="-right-20 top-[10%]" size="h-[500px] w-[500px]" color="rgba(233, 64, 127, 0.08)" delay={0} />
          <FloatingOrb className="-left-20 top-[5%]" size="h-[400px] w-[400px]" color="rgba(124, 58, 237, 0.06)" delay={1.5} />
          <FloatingOrb className="right-[20%] bottom-[15%]" size="h-[300px] w-[300px]" color="rgba(6, 182, 212, 0.04)" delay={3} />
        </>
      )}

      {/* Grain texture */}
      <div className="bg-grain pointer-events-none absolute inset-0 opacity-[0.025]" />

      {/* Particles */}
      <AnimatedParticles prefersReducedMotion={prefersReducedMotion} />

      {/* Bottom gradient fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--va-base)] to-transparent" />

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
          {/* Status label — shimmer */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="group mb-5 inline-flex items-center gap-2 rounded-lg border border-[var(--va-green)]/20 bg-[var(--va-green-dim)] px-3.5 py-2 text-[11px] font-bold tracking-[0.12em] text-[var(--va-green)] transition-all hover:border-[var(--va-green)]/40 hover:shadow-lg hover:shadow-[var(--va-green)]/10"
          >
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="h-3.5 w-3.5" />
            </motion.span>
            YOUR BUSINESS LAUNCH QUEST
          </motion.div>

          {/* Animated Headline */}
          <AnimatedHeadline
            text="Turn your idea into a business people can see, understand and buy from"
            prefersReducedMotion={prefersReducedMotion}
          />

          {/* Typing subtitle */}
          <TypingSubtitle
            text="Tell LaunchLoom what you want to sell. It prepares your brand, products, website, customer messages and enquiry system in one guided experience."
            delay={0.8}
            prefersReducedMotion={prefersReducedMotion}
          />

          {/* CTA buttons with magnetic effect */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <MagneticButton
              as="a"
              href="#brand-builder"
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-[var(--va-magenta)] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[var(--va-magenta)]/30 transition-all hover:brightness-110 hover:shadow-xl"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
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
              <motion.span
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowDown className="h-4 w-4" />
              </motion.span>
            </MagneticButton>

            <MagneticButton
              onClick={onOpenDemo}
              whileTap={{ scale: 0.97 }}
              className="glass-edge inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--va-border)] bg-[var(--va-elevated)] px-6 py-3 text-sm font-semibold text-[var(--va-text)] shadow-sm transition-all hover:border-[var(--va-border-hover)] hover:bg-[var(--va-card-hover)]"
            >
              <PlayCircle className="h-4 w-4" />
              Play the guided demo
            </MagneticButton>
          </motion.div>

          {/* Trust text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.4 }}
            className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-[var(--va-text-muted)]"
          >
            {[
              { text: "No coding required", color: "text-[var(--va-green)]" },
              { text: "Built in a few minutes", color: "text-[var(--va-teal)]" },
              { text: "Everything remains editable", color: "text-[var(--va-amber)]" },
            ].map((item, i) => (
              <motion.span
                key={item.text}
                className="flex items-center gap-1.5 group"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.85 + i * 0.08, duration: 0.3 }}
              >
                <CheckCircle2 className={`h-3.5 w-3.5 ${item.color} transition-transform group-hover:scale-110`} />
                {item.text}
              </motion.span>
            ))}
          </motion.div>

          {/* Progress preview */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.4 }}
            className="mt-6 max-w-xs"
          >
            <LaunchProgress currentLevel={1} />
          </motion.div>
        </motion.div>

        {/* ── Right column: Video + 3D tilt ── */}
        <div className="relative" {...handlers}>
          <motion.div
            className="relative mx-auto w-full max-w-[680px] group"
            style={{
              y: prefersReducedMotion ? 0 : videoY,
              scale: prefersReducedMotion ? 1 : videoScale,
              rotateX: prefersReducedMotion ? 0 : videoRotateX + rotateX * 0.5,
              rotateY: prefersReducedMotion ? 0 : videoRotateY + rotateY * 0.5,
              opacity: prefersReducedMotion ? 1 : videoOpacity,
            }}
          >
            {/* Glow ring */}
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-[var(--va-magenta)]/10 via-transparent to-[var(--va-teal)]/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

            {/* Glass border wrap */}
            <div className="glass-edge overflow-hidden rounded-xl">
              <div className="aspect-[16/9] w-full">
                <HeroVideoLayer className="h-full w-full" />
              </div>
            </div>
          </motion.div>

          {/* Status badge floating */}
          {!prefersReducedMotion && (
            <motion.div
              className="absolute -right-3 -top-3 z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.4 }}
            >
              <motion.span
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--va-border)] bg-[var(--va-panel)]/90 px-3 py-1.5 text-[10px] font-bold text-[var(--va-text-muted)] backdrop-blur-sm"
                animate={{ boxShadow: ["0 0 0px rgba(233,64,127,0)", "0 0 12px rgba(233,64,127,0.15)", "0 0 0px rgba(233,64,127,0)"] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--va-green)] animate-pulse-glow" />
                Live preview
              </motion.span>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
