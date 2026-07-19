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
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--va-green)]">
          Lead dashboard
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-[var(--va-text)] sm:text-4xl">
          Every lead, organised and actionable
        </h2>
        <p className="mt-3 text-base leading-7 text-[var(--va-text-secondary)]">
          Captured leads are automatically scored, categorised, and ready for follow-up.
        </p>
      </motion.div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, accent, bg }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            whileHover={{ y: -3 }}
            className="venture-card rounded-xl p-4"
          >
            <div className="flex items-center justify-between">
              <div className={`grid h-9 w-9 place-items-center rounded-xl ${bg} ${accent}`}>
                <Icon className="h-4 w-4" />
              </div>
              <span className={`text-xs font-bold ${accent}`}>Live</span>
            </div>
            <p className="mt-4 text-2xl font-black text-[var(--va-text)]">{value}</p>
            <p className="mt-0.5 text-xs font-semibold text-[var(--va-text-muted)]">{label}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-6 overflow-hidden rounded-xl border border-[var(--va-border)] bg-[var(--va-card)] shadow-sm"
      >
        <div className="flex items-center justify-between border-b border-[var(--va-border)] bg-[var(--va-elevated)] px-5 py-3.5">
          <p className="text-sm font-bold text-[var(--va-text)]">Recent enquiries</p>
          <a
            href="#leads"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--va-green)] hover:text-[var(--va-green)]"
          >
            View full dashboard
            <ArrowUpRight className="h-3 w-3" />
          </a>
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
                  initial={{ opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="text-[var(--va-text-secondary)] transition-colors hover:bg-[var(--va-elevated)]"
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
                    <span
                      className={`rounded-lg px-2 py-0.5 text-xs font-bold ${
                        lead.score === "Hot"
                          ? "bg-[var(--va-coral)]/20 text-[var(--va-coral)]"
                          : "bg-[var(--va-amber)]/10 text-[var(--va-amber)]"
                      }`}
                    >
                      {lead.score}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-xs font-semibold text-[var(--va-text-muted)]">
                    {lead.status}
                  </td>
                  <td className="px-5 py-3.5">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--va-green-dim)] px-2.5 py-1.5 text-xs font-bold text-[var(--va-green)]"
                    >
                      <MessageCircle className="h-3 w-3" />
                      WhatsApp
                    </button>
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
