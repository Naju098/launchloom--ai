import { motion } from "motion/react";
import {
  FileText,
  Palette,
  Package,
  LayoutTemplate,
  MessageCircleMore,
  Users,
} from "lucide-react";

const missions = [
  {
    icon: FileText,
    title: "Tell us about the business",
    description: "Answer a few simple questions about what you sell and who your customers are.",
    accent: "bg-[var(--va-amber)]/10 text-[var(--va-amber)] border-[var(--va-amber)]/20",
    ringColor: "rgba(245,158,11,0.3)",
  },
  {
    icon: Palette,
    title: "Create the identity",
    description: "LaunchLoom generates your business name, brand colours and brand direction.",
    accent: "bg-[var(--va-teal)]/10 text-[var(--va-teal)] border-[var(--va-teal)]/20",
    ringColor: "rgba(6,182,212,0.3)",
  },
  {
    icon: Package,
    title: "Organise the products",
    description: "Your products are listed with prices, specs and labels for easy comparison.",
    accent: "bg-[var(--va-green)]/10 text-[var(--va-green)] border-[var(--va-green)]/20",
    ringColor: "rgba(233,64,127,0.3)",
  },
  {
    icon: LayoutTemplate,
    title: "Build the website plan",
    description: "A complete website structure is created with the right sections for your business.",
    accent: "bg-[var(--va-coral)]/10 text-[var(--va-coral)] border-[var(--va-coral)]/20",
    ringColor: "rgba(124,58,237,0.3)",
  },
  {
    icon: MessageCircleMore,
    title: "Prepare sales messages",
    description: "Chatbot scripts and WhatsApp follow-ups are ready for your customers.",
    accent: "bg-[var(--va-violet)]/10 text-[var(--va-violet)] border-[var(--va-violet)]/20",
    ringColor: "rgba(168,85,247,0.3)",
  },
  {
    icon: Users,
    title: "Start collecting customers",
    description: "An enquiry system captures interested customers and organises them in a dashboard.",
    accent: "bg-[var(--va-amber)]/10 text-[var(--va-amber)] border-[var(--va-amber)]/20",
    ringColor: "rgba(245,158,11,0.3)",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function MissionPath() {
  return (
    <section className="relative border-y border-[var(--va-border)] bg-[var(--va-panel)]/50 overflow-hidden">
      {/* Decorative background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full opacity-[0.03]"
        style={{ background: "radial-gradient(circle at 50% 50%, var(--va-magenta) 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
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
            How it works
          </motion.p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-[var(--va-text)] sm:text-4xl">
            Complete your launch in <span className="text-gradient-magenta">six clear missions</span>
          </h2>
          <p className="mt-3 text-base leading-7 text-[var(--va-text-secondary)]">
            Each mission unlocks a piece of your business. No experience needed.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="relative mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {/* Background connecting line (only on desktop) */}
          <div className="pointer-events-none absolute left-0 right-0 top-1/2 hidden h-px bg-gradient-to-r from-transparent via-[var(--va-magenta)]/10 to-transparent lg:block" />

          {missions.map(({ icon: Icon, title, description, accent, ringColor }, i) => (
            <motion.div
              key={title}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              className="border-glow group relative rounded-2xl border border-[var(--va-border)] bg-[var(--va-card)] p-6 transition-all duration-300 hover:border-[var(--va-border-hover)] hover:shadow-xl hover:shadow-black/20"
            >
              {/* Mission number */}
              <motion.div
                className="absolute right-4 top-4 text-[10px] font-bold text-[var(--va-text-muted)]"
                whileHover={{ scale: 1.1 }}
              >
                Mission {i + 1}
              </motion.div>

              {/* Icon with pulse ring */}
              <div className="relative inline-block">
                <motion.div
                  className={`grid h-10 w-10 place-items-center rounded-xl ${accent}`}
                  whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon className="h-5 w-5" />
                </motion.div>
                {/* Pulse ring on hover */}
                <motion.span
                  className="absolute inset-0 rounded-xl"
                  initial={{ opacity: 0 }}
                  whileHover={{
                    opacity: [0, 0.4, 0],
                    scale: [1, 1.4, 1.6],
                  }}
                  transition={{ duration: 0.6 }}
                  style={{
                    border: `1px solid ${ringColor}`,
                  }}
                />
              </div>

              <h3 className="mt-4 text-lg font-bold text-[var(--va-text)] group-hover:text-gradient-magenta transition-all duration-300">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[var(--va-text-secondary)]">
                {description}
              </p>

              {/* Connecting arrow hint */}
              {i < missions.length - 1 && (
                <div className="absolute -bottom-2 left-1/2 hidden h-4 w-4 -translate-x-1/2 lg:block">
                  <motion.div
                    className="h-full w-full text-[var(--va-text-muted)]"
                    animate={{ opacity: [0, 0.3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ↓
                  </motion.div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
