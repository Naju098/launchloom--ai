import { motion } from "motion/react";
import { Users, Flame, CircleDollarSign, Clock3, ArrowUpRight, MessageCircle } from "lucide-react";

const stats = [
  { label: "Total leads", value: 8, icon: Users, accent: "text-[var(--va-teal)]", bg: "bg-[var(--va-teal)]/10" },
  { label: "Hot intent", value: 3, icon: Flame, accent: "text-[var(--va-coral)]", bg: "bg-[var(--va-coral)]/10" },
  { label: "Qualified", value: 5, icon: CircleDollarSign, accent: "text-[var(--va-green)]", bg: "bg-[var(--va-green-dim)]" },
  { label: "New today", value: 2, icon: Clock3, accent: "text-[var(--va-amber)]", bg: "bg-[var(--va-amber)]/10" },
];

const sampleLeads = [
  { name: "Arjun Nair", phone: "+91 98765 43210", useCase: "Coding and college", budget: "₹30,000", score: "Hot", status: "Contacted" },
  { name: "Meera Joseph", phone: "+91 91234 56780", useCase: "Remote work", budget: "₹25,000", score: "Warm", status: "New" },
  { name: "Rahul Verma", phone: "+91 99887 76655", useCase: "Graphic design", budget: "₹40,000", score: "Hot", status: "Qualified" },
];

function StatCard({ label, value, icon: Icon, accent, bg, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="border-glow venture-card rounded-xl p-4 group"
    >
      <div className="flex items-center justify-between">
        <motion.div
          className={`grid h-9 w-9 place-items-center rounded-xl ${bg} ${accent}`}
          whileHover={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.3 }}
        >
          <Icon className="h-4 w-4" />
        </motion.div>
        <motion.span
          className={`text-xs font-bold ${accent}`}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Live
        </motion.span>
      </div>
      <p className="mt-4 text-2xl font-black text-[var(--va-text)] group-hover:text-gradient-magenta transition-all duration-300">
        {value}
      </p>
      <p className="mt-0.5 text-xs font-semibold text-[var(--va-text-muted)]">{label}</p>
    </motion.div>
  );
}

const rowVariants = {
  hidden: { opacity: 0, x: -6 },
  visible: (delay) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, delay },
  }),
};

export default function DashboardPreview() {
  return (
    <section id="leads-preview" className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
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
          Lead dashboard
        </motion.p>
        <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-[var(--va-text)] sm:text-4xl">
          Every lead, <span className="text-gradient-magenta">organised</span> and actionable
        </h2>
        <p className="mt-3 text-base leading-7 text-[var(--va-text-secondary)]">
          Captured leads are automatically scored, categorised, and ready for follow-up.
        </p>
      </motion.div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} {...stat} delay={i * 0.06} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
        whileHover={{ y: -2 }}
        className="mt-6 overflow-hidden rounded-xl border border-[var(--va-border)] bg-[var(--va-card)] shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-black/20"
      >
        <div className="flex items-center justify-between border-b border-[var(--va-border)] bg-[var(--va-elevated)] px-5 py-3.5">
          <p className="text-sm font-bold text-[var(--va-text)]">Recent enquiries</p>
          <motion.a
            href="#leads"
            whileHover={{ gap: "0.5rem" }}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--va-green)] transition-all hover:gap-1.5"
          >
            View full dashboard
            <ArrowUpRight className="h-3 w-3" />
          </motion.a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[580px] text-left text-sm">
            <thead>
              <tr className="bg-[var(--va-base)] text-xs font-semibold uppercase tracking-wider text-[var(--va-text-muted)]">
                <th className="px-5 py-3">Lead</th>
                <th className="px-4 py-3">Requirement</th>
                <th className="px-4 py-3">Intent</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--va-border)]">
              {sampleLeads.map((lead, i) => (
                <motion.tr
                  key={lead.name}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i * 0.05}
                  variants={rowVariants}
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                  className="text-[var(--va-text-secondary)] transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <p className="font-semibold text-[var(--va-text)]">{lead.name}</p>
                    <p className="text-xs text-[var(--va-text-muted)]">{lead.phone}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-xs">{lead.useCase}</p>
                    <p className="text-xs text-[var(--va-text-muted)]">{lead.budget}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className={`inline-block rounded-lg px-2 py-0.5 text-xs font-bold ${
                        lead.score === "Hot"
                          ? "bg-[var(--va-coral)]/20 text-[var(--va-coral)]"
                          : "bg-[var(--va-amber)]/10 text-[var(--va-amber)]"
                      }`}
                    >
                      {lead.score}
                    </motion.span>
                  </td>
                  <td className="px-4 py-3.5 text-xs font-semibold text-[var(--va-text-muted)]">
                    {lead.status}
                  </td>
                  <td className="px-5 py-3.5">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--va-green-dim)] px-2.5 py-1.5 text-xs font-bold text-[var(--va-green)] transition-all hover:bg-[var(--va-green)] hover:text-[var(--va-base)]"
                    >
                      <MessageCircle className="h-3 w-3" />
                      WhatsApp
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </section>
  );
}
