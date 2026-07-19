import { motion } from "motion/react";
import {
  FileText,
  Sparkles,
  MessageCircleMore,
  Users,
  ShieldCheck,
  Cog,
} from "lucide-react";

const benefits = [
  { icon: FileText, label: "Complete launch kit", accent: "text-[var(--va-teal)]" },
  { icon: Sparkles, label: "Structured AI output", accent: "text-[var(--va-amber)]" },
  { icon: MessageCircleMore, label: "Sales-ready content", accent: "text-[var(--va-green)]" },
  { icon: Users, label: "Lead capture included", accent: "text-[var(--va-violet)]" },
  { icon: ShieldCheck, label: "Editable results", accent: "text-[var(--va-coral)]" },
  { icon: Cog, label: "Kimi API-ready", accent: "text-[var(--va-teal)]" },
];

export default function TrustStrip() {
  return (
    <section className="border-y border-[var(--va-border)] bg-[var(--va-panel)]/50">
      <div className="mx-auto max-w-7xl px-5 py-4 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.04 } },
          }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:gap-x-8"
        >
          {benefits.map(({ icon: Icon, label, accent }) => (
            <motion.span
              key={label}
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
              }}
              className={`inline-flex items-center gap-1.5 text-xs font-semibold ${accent}`}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
