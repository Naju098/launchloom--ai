import { motion } from "motion/react";
import { Users, Info, Flame, MessageCircle } from "lucide-react";
import SimpleExplanation from "./SimpleExplanation";

export default function DemoStep9Leads() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="text-[var(--va-text)]"
    >
      <h2 className="text-xl font-black sm:text-2xl">
        Customer enquiry dashboard
      </h2>

      <div className="mt-4 flex items-start gap-3 rounded-xl bg-[var(--va-amber)]/10 px-4 py-3">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-[var(--va-amber)]" />
        <p className="text-sm leading-6 text-[var(--va-amber)]">
          <span className="font-bold">A lead</span> is a person who has shown
          interest in your product or service. The dashboard helps the business
          remember who contacted them, what they need and who should be followed up.
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total enquiries", value: "8", icon: Users },
          { label: "Ready to buy", value: "3", icon: Flame },
          { label: "Needs follow-up", value: "5", icon: Info },
          { label: "New today", value: "2", icon: Users },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="venture-card rounded-xl p-4 text-center">
            <Icon className="mx-auto h-4 w-4 text-[var(--va-green)]" />
            <p className="mt-2 text-xl font-black text-[var(--va-text)]">{value}</p>
            <p className="text-xs font-semibold text-[var(--va-text-muted)]">{label}</p>
          </div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mt-5 overflow-hidden rounded-2xl border border-[var(--va-border)] bg-[var(--va-card)] shadow-sm"
      >
        <div className="border-b border-[var(--va-border)] bg-[var(--va-elevated)] px-5 py-3">
          <p className="text-sm font-bold text-[var(--va-text)]">Sample enquiry</p>
        </div>
        <div className="divide-y divide-[var(--va-border)] px-5 py-4">
          {[
            ["Customer", "Arun"],
            ["Requirement", "Programming laptop"],
            ["Budget", "₹35,000"],
            ["Recommended product", "Lenovo ThinkPad T490"],
            ["Status", "New enquiry"],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between py-2.5">
              <p className="text-sm text-[var(--va-text-muted)]">{label}</p>
              <p className="text-sm font-semibold text-[var(--va-text)]">{value}</p>
            </div>
          ))}
        </div>
        <div className="border-t border-[var(--va-border)] px-5 py-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--va-green-dim)] px-3.5 py-2 text-xs font-bold text-[var(--va-green)]"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            Send WhatsApp message
          </button>
        </div>
      </motion.div>

      <SimpleExplanation delay={0.3}>
        <p className="font-semibold">Why this is useful:</p>
        <p className="mt-1">Instead of writing down customer details on paper, the dashboard keeps everything organised so you never miss an opportunity.</p>
      </SimpleExplanation>
    </motion.div>
  );
}
