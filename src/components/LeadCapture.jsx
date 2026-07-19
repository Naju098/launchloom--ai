import { useState } from "react";
import { motion } from "motion/react";
import { Check, Send, ShieldCheck } from "lucide-react";

const emptyLead = {
  name: "",
  phone: "",
  useCase: "Coding and college",
  budget: "₹30,000",
  product: "Dell Latitude 5420",
};

export default function LeadCapture({ products, onSubmit }) {
  const [lead, setLead] = useState(emptyLead);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(lead);
    setSubmitted(true);
    setLead(emptyLead);
    window.setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="mt-14 overflow-hidden rounded-2xl border border-[var(--va-border)] bg-[var(--va-panel)] shadow-xl"
    >
      <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
        <div className="relative overflow-hidden p-7 sm:p-10">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[var(--va-green)]/10 blur-3xl" />
          <div className="absolute -bottom-24 right-0 h-64 w-64 rounded-full bg-[var(--va-amber)]/5 blur-3xl" />
          <div className="relative">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--va-green)]">
              Lead capture
            </p>
            <h3 className="mt-4 text-3xl font-black tracking-tight text-[var(--va-text)] sm:text-4xl">
              Convert product interest into a sales-ready lead.
            </h3>
            <p className="mt-4 max-w-lg leading-7 text-[var(--va-text-secondary)]">
              The form captures intent, budget, preferred product, and contact
              details. Submitted leads instantly appear in the dashboard.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "Stored locally for this demo",
                "Automatically scored by budget",
                "Ready for CRM or WhatsApp integration",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm font-semibold text-[var(--va-text-secondary)]">
                  <div className="grid h-7 w-7 place-items-center rounded-full bg-[var(--va-green-dim)]">
                    <Check className="h-4 w-4 text-[var(--va-green)]" />
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="bg-[var(--va-elevated)] p-6 sm:p-9"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="sm:col-span-1">
              <span className="mb-2 block text-sm font-bold text-[var(--va-text)]">Full name</span>
              <input
                required
                value={lead.name}
                onChange={(event) => setLead({ ...lead, name: event.target.value })}
                placeholder="Enter customer name"
                className="w-full rounded-xl border border-[var(--va-input-border)] bg-[var(--va-input)] px-4 py-3.5 text-sm text-[var(--va-text)] outline-none transition-all placeholder:text-[var(--va-text-muted)] focus:border-[var(--va-green)] focus:ring-4 focus:ring-[var(--va-input-focus)]"
              />
            </label>
            <label className="sm:col-span-1">
              <span className="mb-2 block text-sm font-bold text-[var(--va-text)]">WhatsApp number</span>
              <input
                required
                value={lead.phone}
                onChange={(event) => setLead({ ...lead, phone: event.target.value })}
                placeholder="+91 98765 43210"
                className="w-full rounded-xl border border-[var(--va-input-border)] bg-[var(--va-input)] px-4 py-3.5 text-sm text-[var(--va-text)] outline-none transition-all placeholder:text-[var(--va-text-muted)] focus:border-[var(--va-green)] focus:ring-4 focus:ring-[var(--va-input-focus)]"
              />
            </label>
            <label>
              <span className="mb-2 block text-sm font-bold text-[var(--va-text)]">Primary use</span>                <select
                value={lead.useCase}
                onChange={(event) => setLead({ ...lead, useCase: event.target.value })}
                className="w-full rounded-xl border border-[var(--va-input-border)] bg-[var(--va-input)] px-4 py-3.5 text-sm text-[var(--va-text)] outline-none transition-all focus:border-[var(--va-green)] focus:ring-4 focus:ring-[var(--va-input-focus)]"
                style={{ colorScheme: 'dark' }}
              >
                <option className="bg-[var(--va-elevated)] text-[var(--va-text)]">Coding and college</option>
                <option className="bg-[var(--va-elevated)] text-[var(--va-text)]">Remote work</option>
                <option className="bg-[var(--va-elevated)] text-[var(--va-text)]">Graphic design</option>
                <option className="bg-[var(--va-elevated)] text-[var(--va-text)]">Office bulk purchase</option>
              </select>
            </label>
            <label>
              <span className="mb-2 block text-sm font-bold text-[var(--va-text)]">Budget</span>                <select
                value={lead.budget}
                onChange={(event) => setLead({ ...lead, budget: event.target.value })}
                className="w-full rounded-xl border border-[var(--va-input-border)] bg-[var(--va-input)] px-4 py-3.5 text-sm text-[var(--va-text)] outline-none transition-all focus:border-[var(--va-green)] focus:ring-4 focus:ring-[var(--va-input-focus)]"
                style={{ colorScheme: 'dark' }}
              >
                <option className="bg-[var(--va-elevated)] text-[var(--va-text)]">₹20,000</option>
                <option className="bg-[var(--va-elevated)] text-[var(--va-text)]">₹25,000</option>
                <option className="bg-[var(--va-elevated)] text-[var(--va-text)]">₹30,000</option>
                <option className="bg-[var(--va-elevated)] text-[var(--va-text)]">₹40,000</option>
              </select>
            </label>
            <label className="sm:col-span-2">
              <span className="mb-2 block text-sm font-bold text-[var(--va-text)]">Preferred laptop</span>                <select
                value={lead.product}
                onChange={(event) => setLead({ ...lead, product: event.target.value })}
                className="w-full rounded-xl border border-[var(--va-input-border)] bg-[var(--va-input)] px-4 py-3.5 text-sm text-[var(--va-text)] outline-none transition-all focus:border-[var(--va-green)] focus:ring-4 focus:ring-[var(--va-input-focus)]"
                style={{ colorScheme: 'dark' }}
              >
                {products.map((product) => (
                  <option key={product.id} className="bg-[var(--va-elevated)] text-[var(--va-text)]">{product.name}</option>
                ))}
              </select>
            </label>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--va-green)] px-5 py-3.5 text-sm font-black text-[var(--va-base)] shadow-lg shadow-[var(--va-green)]/20 transition-all hover:brightness-110"
          >
            {submitted ? <Check className="h-4 w-4" /> : <Send className="h-4 w-4" />}
            {submitted ? "Lead added to dashboard" : "Request recommendation"}
          </motion.button>

          <p className="mt-4 flex items-center justify-center gap-2 text-xs text-[var(--va-text-muted)]">
            <ShieldCheck className="h-3.5 w-3.5" />
            Demo form. Connect your consent and privacy flow before launch.
          </p>
        </motion.form>
      </div>
    </motion.section>
  );
}
