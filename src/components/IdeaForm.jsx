import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, LoaderCircle, Rocket, Lightbulb, MapPin, Users, Package, IndianRupee, ShieldCheck } from "lucide-react";

const initialValues = {
  businessType: "Used laptop store",
  location: "Kochi, Kerala",
  targetAudience: "College students, professionals, startups, and small offices",
  productCategory: "Refurbished business laptops",
  priceRange: "₹18,000 – ₹45,000",
  mainPromise: "Premium performance. Smarter prices.",
};

const fields = [
  { key: "businessType", label: "Business type", icon: Lightbulb, placeholder: "Example: Used laptop store" },
  { key: "location", label: "Location", icon: MapPin, placeholder: "Example: Kochi, Kerala" },
  { key: "targetAudience", label: "Target audience", icon: Users, placeholder: "Who should buy from you?" },
  { key: "productCategory", label: "Product category", icon: Package, placeholder: "What are you selling?" },
  { key: "priceRange", label: "Price range", icon: IndianRupee, placeholder: "Example: ₹20,000 – ₹50,000" },
  { key: "mainPromise", label: "Main promise", icon: ShieldCheck, placeholder: "Your strongest customer promise" },
];

const fieldVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export default function IdeaForm({ onGenerate, loading }) {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onGenerate(formData);
  };

  return (
    <section id="brand-builder" className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
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
          Mission setup
        </motion.p>
        <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-[var(--va-text)] sm:text-4xl">
          Set up your <span className="text-gradient-magenta">business mission</span>
        </h2>
        <p className="mt-3 text-base leading-7 text-[var(--va-text-secondary)]">
          Step 1 of 1 — Business details. The form is prefilled with the Kochi demo. Edit any field to customise.
        </p>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="mt-9 rounded-2xl border border-[var(--va-border)] bg-[var(--va-panel)] p-6 shadow-2xl shadow-black/20 sm:p-8"
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {fields.map((field, i) => {
            const Icon = field.icon;
            return (
              <motion.label
                key={field.key}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.05}
                variants={fieldVariants}
                className="block"
              >
                <span className="mb-2 flex items-center gap-2 text-sm font-bold text-[var(--va-text)]">
                  <Icon className="h-3.5 w-3.5 text-[var(--va-green)]" />
                  {field.label}
                </span>
                <input
                  required
                  name={field.key}
                  value={formData[field.key]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full rounded-xl border border-[var(--va-input-border)] bg-[var(--va-input)] px-4 py-3.5 text-sm text-[var(--va-text)] outline-none transition-all duration-200 placeholder:text-[var(--va-text-muted)] focus:border-[var(--va-green)] focus:ring-4 focus:ring-[var(--va-input-focus)] focus:scale-[1.01]"
                />
              </motion.label>
            );
          })}
        </div>

        <div className="mt-7 flex flex-col items-start justify-between gap-5 border-t border-[var(--va-border)] pt-6 sm:flex-row sm:items-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-start gap-3 text-sm text-[var(--va-text-muted)]"
          >
            <motion.div
              className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[var(--va-green-dim)] text-[var(--va-green)]"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Rocket className="h-4 w-4" />
            </motion.div>
            <p className="max-w-xl leading-6">
              Demo mode uses structured dummy output. Connect your AI backend for live generation.
            </p>
          </motion.div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={loading ? {} : { scale: 1.03 }}
            whileTap={loading ? {} : { scale: 0.97 }}
            className="group relative inline-flex min-w-52 items-center justify-center gap-2 overflow-hidden rounded-xl bg-[var(--va-green)] px-5 py-3.5 text-sm font-black text-[var(--va-base)] shadow-lg shadow-[var(--va-green)]/20 transition-all duration-200 hover:brightness-110 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            {loading ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Generating your launch world
              </>
            ) : (
              <>
                Generate my launch world
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </>
            )}
          </motion.button>
        </div>
      </motion.form>
    </section>
  );
}
