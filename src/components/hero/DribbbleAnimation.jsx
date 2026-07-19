import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  CheckCircle2,
  LoaderCircle,
  Sparkles,
  Package,
  Users,
  Palette,
  TrendingUp,
  Zap,
} from "lucide-react";

const PHASE_DURATIONS = [3000, 4000, 3500, 3500];

function stagger(i, base = 0.08) {
  return i * base;
}

export default function DribbbleAnimation({ className = "" }) {
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState(2);
  const phaseRef = useRef(2);
  const timeRef = useRef(0);
  const startRef = useRef(Date.now());
  const rafRef = useRef(null);
  const containerRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const activeRef = useRef(true);

  const tick = useCallback(() => {
    if (!activeRef.current || hovered) { rafRef.current = null; return; }
    const elapsed = Date.now() - startRef.current;
    let accumulated = 0;
    for (let i = 0; i < PHASE_DURATIONS.length; i++) {
      accumulated += PHASE_DURATIONS[i];
      if (elapsed < accumulated) {
        const t = elapsed - (accumulated - PHASE_DURATIONS[i]);
        if (i !== phaseRef.current) { phaseRef.current = i; setPhase(i); }
        timeRef.current = t;
        break;
      }
    }
    if (elapsed >= accumulated) {
      startRef.current = Date.now();
      phaseRef.current = 0; timeRef.current = 0; setPhase(0);
    }
    rafRef.current = requestAnimationFrame(tick);
  }, [hovered]);

  const tickRef = useRef(tick);
  useEffect(() => { tickRef.current = tick; }, [tick]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const el = containerRef.current; if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        activeRef.current = entry.isIntersecting && !hovered;
        if (activeRef.current && !rafRef.current) rafRef.current = requestAnimationFrame(tickRef.current);
        else if (!activeRef.current && rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion, hovered]);

  useEffect(() => {
    if (prefersReducedMotion) { setPhase(2); return; }
    if (hovered) { if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; } }
    else { if (!rafRef.current) { startRef.current = Date.now() - timeRef.current; rafRef.current = requestAnimationFrame(tick); } }
    return () => { if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; } };
  }, [prefersReducedMotion, hovered, tick]);

  const handleMouseEnter = useCallback(() => setHovered(true), []);
  const handleMouseLeave = useCallback(() => { startRef.current = Date.now() - timeRef.current; setHovered(false); }, []);

  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    if (prefersReducedMotion || hovered) return;
    const id = setInterval(() => setNow(Date.now()), 100);
    return () => clearInterval(id);
  }, [prefersReducedMotion, hovered]);

  const startOfPhase = PHASE_DURATIONS.slice(0, phase).reduce((a, b) => a + b, 0);
  const elapsedInPhase = Math.max(0, Math.min(now - startRef.current - startOfPhase, PHASE_DURATIONS[phase]));
  const progress = Math.min(elapsedInPhase / PHASE_DURATIONS[phase], 1);
  const pct = Math.round(((startOfPhase + elapsedInPhase) / PHASE_DURATIONS.reduce((a, b) => a + b, 0)) * 100);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-3xl border border-[var(--va-border)] bg-[var(--va-panel)] shadow-2xl shadow-black/40 ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Magenta inner glow */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-[var(--va-magenta)]/[0.05] to-transparent" />

      <div className="relative flex h-full w-full flex-col">
        {/* Status bar */}
        <div className="flex shrink-0 items-center justify-between border-b border-[var(--va-border)] px-4 py-2.5">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-[var(--va-magenta)] shadow-[0_0_8px_var(--va-magenta)] animate-pulse-glow" />
              <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--va-magenta)]">Live</span>
            </div>
            <div className="hidden text-[10px] font-semibold text-[var(--va-text-muted)] sm:block">Launch Preview</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full ${i <= phase && phase < 4 ? "bg-[var(--va-magenta)]" : "bg-[var(--va-border)]"}`}
                  animate={i === phase && phase < 4 ? { scale: [1, 1.6, 1] } : undefined}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
              ))}
            </div>
            <span className="ml-1.5 text-[9px] font-bold text-[var(--va-text-muted)]">{pct}%</span>
          </div>
        </div>

        {/* Content area */}
        <div className="relative flex-1 p-4 sm:p-5">
          <AnimatePresence mode="wait">
            {/* PHASE 0: Analyzing */}
            {phase === 0 && (
              <motion.div key="phase0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="flex h-full flex-col items-center justify-center gap-4">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="grid h-14 w-14 place-items-center rounded-2xl bg-[var(--va-magenta-dim)]">
                  <LoaderCircle className="h-7 w-7 text-[var(--va-magenta)]" />
                </motion.div>
                <p className="text-sm font-bold text-[var(--va-text)]">Analyzing your business idea</p>
                <div className="mt-2 w-full max-w-[220px] space-y-2.5">
                  {["Market research", "Competitor analysis", "Brand positioning"].map((label, i) => (
                    <div key={label} className="space-y-1">
                      <div className="flex justify-between text-[10px]">
                        <span className="font-semibold text-[var(--va-text-secondary)]">{label}</span>
                        <span className="font-bold text-[var(--va-magenta)]">{Math.min(100, Math.round((progress + i * 0.2) * 100))}%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-[var(--va-elevated)]">
                        <motion.div className="h-full rounded-full bg-[var(--va-magenta)]" initial={{ width: "0%" }} animate={{ width: `${Math.min(100, Math.round((progress + i * 0.2) * 100))}%` }} transition={{ duration: 0.3 }} />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* PHASE 1: Brand Identity */}
            {phase === 1 && (
              <motion.div key="phase1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="h-full">
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, type: "spring", stiffness: 200 }} className="mb-4 inline-flex items-center gap-2 rounded-lg bg-[var(--va-magenta-dim)] px-3 py-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[var(--va-magenta)]" />
                  <span className="text-[10px] font-bold text-[var(--va-magenta)]">Brand identity created</span>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.5 }} className="rounded-xl border border-[var(--va-border)] bg-[var(--va-elevated)] p-4 shadow-md">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[var(--va-text-muted)]">Business Name</p>
                      <p className="mt-1 text-xl font-black text-[var(--va-text)]">NexStep Tech</p>
                      <p className="mt-0.5 text-xs font-semibold text-[var(--va-magenta)]">Smart devices. Smarter prices.</p>
                    </div>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: "spring", stiffness: 300 }} className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--va-magenta-dim)]">
                      <Palette className="h-4 w-4 text-[var(--va-magenta)]" />
                    </motion.div>
                  </div>
                  <div className="mt-3 flex gap-1.5">
                    {["#0B0A12", "#E9407F", "#06B6D4", "#F59E0B"].map((hex, i) => (
                      <motion.div key={hex} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35 + stagger(i), type: "spring", stiffness: 300 }} className="h-5 w-5 rounded-md shadow-inner ring-1 ring-white/10" style={{ backgroundColor: hex }} />
                    ))}
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.4 }} className="mt-3 rounded-lg bg-[var(--va-panel)] px-3.5 py-2.5">
                  <div className="flex items-start gap-2">
                    <Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-[var(--va-amber)]" />
                    <p className="text-[10px] leading-5 text-[var(--va-text-secondary)]">Premium refurbished tech for students and professionals who need reliable performance without paying new-device prices.</p>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* PHASE 2: Products Matched */}
            {phase === 2 && (
              <motion.div key="phase2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="h-full">
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, type: "spring", stiffness: 200 }} className="mb-4 inline-flex items-center gap-2 rounded-lg bg-[var(--va-teal)]/10 px-3 py-1.5">
                  <Package className="h-3.5 w-3.5 text-[var(--va-teal)]" />
                  <span className="text-[10px] font-bold text-[var(--va-teal)]">3 products matched</span>
                </motion.div>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { name: "ProBook X1", spec: "i7 · 16GB", price: "₹32,999", score: 96, color: "var(--va-magenta)" },
                    { name: "ThinkPad T14", spec: "i5 · 16GB", price: "₹25,499", score: 91, color: "var(--va-teal)" },
                    { name: "EliteBook 840", spec: "i5 · 8GB", price: "₹23,999", score: 89, color: "var(--va-amber)" },
                  ].map((p, i) => (
                    <motion.div key={p.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + stagger(i, 0.1), duration: 0.4 }} className="rounded-xl border border-[var(--va-border)] bg-[var(--va-elevated)] p-3 shadow-md">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-[9px] font-bold uppercase tracking-[0.08em] text-[var(--va-text-muted)]">Best match</span>
                        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.35 + stagger(i), type: "spring" }} className="text-[10px] font-black" style={{ color: p.color }}>{p.score}%</motion.span>
                      </div>
                      <p className="text-xs font-bold text-[var(--va-text)]">{p.name}</p>
                      <p className="text-[9px] text-[var(--va-text-secondary)]">{p.spec}</p>
                      <p className="mt-1.5 text-sm font-black text-[var(--va-text)]">{p.price}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.4 }} className="mt-3 flex items-center gap-2 rounded-lg bg-[var(--va-panel)] px-3.5 py-2">
                  <TrendingUp className="h-3.5 w-3.5 text-[var(--va-magenta)]" />
                  <span className="text-[10px] font-semibold text-[var(--va-text-secondary)]">Match confidence</span>
                  <div className="ml-auto flex items-end gap-1">
                    {[{ score: 96, bg: "var(--va-magenta)" }, { score: 91, bg: "var(--va-teal)" }, { score: 89, bg: "var(--va-amber)" }].map((s, i) => (
                      <motion.div key={s.score} initial={{ height: 0 }} animate={{ height: s.score / 3 }} transition={{ delay: 0.7 + stagger(i), duration: 0.3 }} className="w-2 rounded-t-sm" style={{ background: s.bg, height: `${s.score / 3}px` }} />
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* PHASE 3: Customer System Active */}
            {phase === 3 && (
              <motion.div key="phase3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="h-full">
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, type: "spring", stiffness: 200 }} className="mb-4 inline-flex items-center gap-2 rounded-lg bg-[var(--va-violet)]/10 px-3 py-1.5">
                  <Users className="h-3.5 w-3.5 text-[var(--va-violet)]" />
                  <span className="text-[10px] font-bold text-[var(--va-violet)]">Customer system active</span>
                </motion.div>

                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: "Leads", value: 8, color: "var(--va-magenta)" },
                    { label: "Hot", value: 3, color: "var(--va-teal)" },
                    { label: "Qualified", value: 5, color: "var(--va-violet)" },
                    { label: "Today", value: 2, color: "var(--va-amber)" },
                  ].map((m, i) => (
                    <motion.div key={m.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + stagger(i, 0.08), duration: 0.35 }} className="rounded-lg border border-[var(--va-border)] bg-[var(--va-elevated)] p-2.5 text-center shadow-sm">
                      <motion.p className="text-base font-black" style={{ color: m.color }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 + stagger(i, 0.08) }}>{m.value}</motion.p>
                      <p className="text-[9px] font-semibold text-[var(--va-text-muted)]">{m.label}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.4, type: "spring" }} className="mt-3 flex items-center gap-3 rounded-xl border border-[var(--va-magenta-dim)] bg-[var(--va-magenta-dim)]/20 px-3.5 py-2.5">
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.8 }} className="grid h-7 w-7 place-items-center rounded-lg bg-[var(--va-magenta-dim)]">
                    <Zap className="h-3.5 w-3.5 text-[var(--va-magenta)]" />
                  </motion.div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-[var(--va-text)]">New enquiry received</p>
                    <p className="text-[9px] text-[var(--va-text-secondary)]">Coding laptop · Budget ₹35,000</p>
                  </div>
                  <span className="rounded-full bg-[var(--va-amber)]/20 px-2 py-0.5 text-[8px] font-bold text-[var(--va-amber)]">NEW</span>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.35 }} className="mt-2 rounded-lg bg-[var(--va-panel)] px-3.5 py-2">
                  <div className="flex gap-2">
                    <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--va-magenta-dim)] text-[8px] font-bold text-[var(--va-magenta)]">A</div>
                    <div>
                      <p className="text-[10px] font-bold text-[var(--va-text)]">Arun</p>
                      <p className="text-[9px] text-[var(--va-text-secondary)]">I need a laptop for programming under ₹35,000</p>
                    </div>
                    <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.2, repeat: Infinity }} className="ml-auto mt-0.5 h-1.5 w-1.5 rounded-full bg-[var(--va-magenta)]" />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Magenta edge ring */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-[var(--va-magenta)]/15" />

      {/* Hover pause badge */}
      <AnimatePresence>
        {hovered && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.2 }} className="absolute bottom-3 right-3 rounded-md bg-[var(--va-elevated)]/80 px-2 py-1 text-[8px] font-semibold text-[var(--va-text-muted)] shadow-sm backdrop-blur-sm">
            Paused
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
