import { motion } from "motion/react";
import {
  FileText,
  Sparkles,
  MessageCircleMore,
  Users,
  ShieldCheck,
  Cog,
  Zap,
  Star,
} from "lucide-react";

const benefits = [
  { icon: FileText, label: "Complete launch kit", accent: "text-[var(--va-teal)]" },
  { icon: Sparkles, label: "Structured AI output", accent: "text-[var(--va-amber)]" },
  { icon: MessageCircleMore, label: "Sales-ready content", accent: "text-[var(--va-green)]" },
  { icon: Users, label: "Lead capture included", accent: "text-[var(--va-violet)]" },
  { icon: ShieldCheck, label: "Editable results", accent: "text-[var(--va-coral)]" },
  { icon: Cog, label: "Kimi API-ready", accent: "text-[var(--va-teal)]" },
  { icon: Zap, label: "Lightning fast", accent: "text-[var(--va-amber)]" },
  { icon: Star, label: "Premium quality", accent: "text-[var(--va-green)]" },
];

export default function TrustStrip() {
  return (
    <section className="border-y border-[var(--va-border)] bg-[var(--va-panel)]/50 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 py-4 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.03 } },
          }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:gap-x-8"
        >
          {benefits.map(({ icon: Icon, label, accent }) => (
            <motion.span
              key={label}
              variants={{
                hidden: { opacity: 0, y: 8, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } },
              }}
              whileHover={{ scale: 1.08, y: -2 }}
              className={`inline-flex items-center gap-1.5 text-xs font-semibold transition-all duration-200 cursor-default ${accent}`}
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.4 }}
              >
                <Icon className="h-3.5 w-3.5" />
              </motion.div>
              {label}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
