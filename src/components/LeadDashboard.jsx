import { motion } from "motion/react";
import {
  ArrowUpRight,
  CircleDollarSign,
  Clock3,
  Flame,
  MessageCircle,
  Users,
  Target,
} from "lucide-react";

const statuses = ["New", "Contacted", "Qualified", "Won"];

function formatTime(isoDate) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(isoDate));
}

const statCardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export default function LeadDashboard({ leads, onStatusChange, onBackToStudio }) {
  const stats = [
    { label: "New enquiries", value: leads.filter((lead) => lead.status === "New").length, icon: Users, accent: "text-[var(--va-teal)]", bg: "bg-[var(--va-teal)]/10" },
    { label: "Hot customers", value: leads.filter((lead) => lead.score === "Hot").length, icon: Flame, accent: "text-[var(--va-coral)]", bg: "bg-[var(--va-coral)]/10" },
    { label: "Qualified", value: leads.filter((lead) => lead.status === "Qualified").length, icon: Target, accent: "text-[var(--va-green)]", bg: "bg-[var(--va-green-dim)]" },
    { label: "Completed", value: leads.filter((lead) => lead.status === "Won").length, icon: CircleDollarSign, accent: "text-[var(--va-amber)]", bg: "bg-[var(--va-amber)]/10" },
  ];

  return (
    <main className="mx-auto min-h-[calc(100vh-76px)] max-w-7xl px-5 py-12 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col justify-between gap-5 md:flex-row md:items-end"
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--va-green)]">
            Customer Mission Control
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.03em] text-[var(--va-text)] sm:text-4xl">
            Lead dashboard
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--va-text-secondary)]">
            All captured leads, scored and ready for follow-up. This demo reads from localStorage.
          </p>
        </div>
        <motion.button
          type="button"
          onClick={onBackToStudio}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--va-green-dim)] px-4 py-3 text-sm font-bold text-[var(--va-green)] transition-all hover:bg-[var(--va-green)]/20"
        >
          Open launch studio
          <ArrowUpRight className="h-4 w-4" />
        </motion.button>
      </motion.div>

      <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, accent, bg }, index) => (
          <motion.div
            key={label}
            initial="hidden"
            animate="visible"
            custom={index * 0.06}
            variants={statCardVariants}
            whileHover={{ y: -4 }}
            className="venture-card rounded-2xl p-5"
          >
            <div className="flex items-center justify-between">
              <div className={`grid h-10 w-10 place-items-center rounded-xl ${bg} ${accent}`}>
                <Icon className="h-5 w-5" />
              </div>
              <span className={`text-xs font-bold ${accent}`}>Live</span>
            </div>
            <p className="mt-6 text-3xl font-black text-[var(--va-text)]">{value}</p>
            <p className="mt-1 text-sm font-semibold text-[var(--va-text-muted)]">{label}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        className="mt-7 overflow-hidden rounded-2xl border border-[var(--va-border)] bg-[var(--va-card)] shadow-sm"
      >
        <div className="flex items-center justify-between border-b border-[var(--va-border)] bg-[var(--va-elevated)] px-6 py-5">
          <div>
            <h3 className="font-black text-[var(--va-text)]">Lead pipeline</h3>
            <p className="mt-1 text-sm text-[var(--va-text-muted)]">Update each lead as the conversation progresses.</p>
          </div>
          <div className="hidden rounded-lg bg-[var(--va-green-dim)] px-3 py-1.5 text-xs font-bold text-[var(--va-green)] sm:block">
            {leads.length} active records
          </div>
        </div>

        {leads.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="mx-auto h-10 w-10 text-[var(--va-text-muted)]" />
            <p className="mt-4 font-bold text-[var(--va-text)]">No leads yet</p>
            <p className="mt-1 text-sm text-[var(--va-text-muted)]">Submit the lead form in the launch studio.</p>
          </div>
        ) : (
          <div className="scrollbar-thin overflow-x-auto">
            <table className="w-full min-w-[980px] text-left">
              <thead className="bg-[var(--va-base)] text-xs font-black uppercase tracking-[0.12em] text-[var(--va-text-muted)]">
                <tr>
                  <th className="px-6 py-4">Lead</th>
                  <th className="px-4 py-4">Requirement</th>
                  <th className="px-4 py-4">Product</th>
                  <th className="px-4 py-4">Intent</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4">Created</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--va-border)]">
                {leads.map((lead) => (
                  <motion.tr
                    key={lead.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm text-[var(--va-text-secondary)] transition-colors hover:bg-[var(--va-elevated)]"
                  >
                    <td className="px-6 py-5">
                      <p className="font-black text-[var(--va-text)]">{lead.name}</p>
                      <p className="mt-1 text-xs text-[var(--va-text-muted)]">{lead.phone}</p>
                    </td>
                    <td className="px-4 py-5">
                      <p className="font-semibold text-[var(--va-text)]">{lead.useCase}</p>
                      <p className="mt-1 text-xs text-[var(--va-text-muted)]">Budget {lead.budget}</p>
                    </td>
                    <td className="px-4 py-5 font-semibold text-[var(--va-text)]">{lead.product}</td>
                    <td className="px-4 py-5">
                      <span
                        className={`rounded-lg px-2.5 py-1 text-xs font-black ${
                          lead.score === "Hot"
                            ? "bg-[var(--va-coral)]/20 text-[var(--va-coral)]"
                            : "bg-[var(--va-amber)]/10 text-[var(--va-amber)]"
                        }`}
                      >
                        {lead.score}
                      </span>
                    </td>
                    <td className="px-4 py-5">
                      <select
                        value={lead.status}
                        onChange={(event) => onStatusChange(lead.id, event.target.value)}
                        className="rounded-xl border border-[var(--va-input-border)] bg-[var(--va-input)] px-3 py-2 text-xs font-bold text-[var(--va-text)] outline-none transition-all focus:border-[var(--va-green)] focus:ring-4 focus:ring-[var(--va-input-focus)]"
                      >
                        {statuses.map((status) => (
                          <option key={status}>{status}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-5 text-xs text-[var(--va-text-muted)]">{formatTime(lead.createdAt)}</td>
                    <td className="px-6 py-5">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 rounded-xl bg-[var(--va-green-dim)] px-3 py-2 text-xs font-black text-[var(--va-green)] transition-colors hover:bg-[var(--va-green)]/20"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        WhatsApp
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </main>
  );
}
