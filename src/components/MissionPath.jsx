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
  },
  {
    icon: Palette,
    title: "Create the identity",
    description: "LaunchLoom generates your business name, brand colours and brand direction.",
    accent: "bg-[var(--va-teal)]/10 text-[var(--va-teal)] border-[var(--va-teal)]/20",
  },
  {
    icon: Package,
    title: "Organise the products",
    description: "Your products are listed with prices, specs and labels for easy comparison.",
    accent: "bg-[var(--va-green)]/10 text-[var(--va-green)] border-[var(--va-green)]/20",
  },
  {
    icon: LayoutTemplate,
    title: "Build the website plan",
    description: "A complete website structure is created with the right sections for your business.",
    accent: "bg-[var(--va-coral)]/10 text-[var(--va-coral)] border-[var(--va-coral)]/20",
  },
  {
    icon: MessageCircleMore,
    title: "Prepare sales messages",
    description: "Chatbot scripts and WhatsApp follow-ups are ready for your customers.",
    accent: "bg-[var(--va-violet)]/10 text-[var(--va-violet)] border-[var(--va-violet)]/20",
  },
  {
    icon: Users,
    title: "Start collecting customers",
    description: "An enquiry system captures interested customers and organises them in a dashboard.",
    accent: "bg-[var(--va-amber)]/10 text-[var(--va-amber)] border-[var(--va-amber)]/20",
  },
];

export default function MissionPath() {
  return (
    <section className="border-y border-[var(--va-border)] bg-[var(--va-panel)]/50">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--va-green)]">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-[var(--va-text)] sm:text-4xl">
            Complete your launch in six clear missions
          </h2>
          <p className="mt-3 text-base leading-7 text-[var(--va-text-secondary)]">
            Each mission unlocks a piece of your business. No experience needed.
          </p>
        </motion.div>

        <div className="relative mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {missions.map(({ icon: Icon, title, description, accent }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ y: -4 }}
              className="relative rounded-2xl border border-[var(--va-border)] bg-[var(--va-card)] p-6 transition-all hover:border-[var(--va-border-hover)] hover:shadow-xl hover:shadow-black/20"
            >
              {/* Mission number */}
              <div className="absolute right-4 top-4 text-[10px] font-bold text-[var(--va-text-muted)]">
                Mission {i + 1}
              </div>

              <div className={`grid h-10 w-10 place-items-center rounded-xl ${accent}`}>
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-[var(--va-text)]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--va-text-secondary)]">
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
