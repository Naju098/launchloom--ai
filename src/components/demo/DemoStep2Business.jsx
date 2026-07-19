import { motion } from "motion/react";
import { Info } from "lucide-react";

const fields = [
  { key: "businessType", label: "Business type", value: "Used laptop store", help: "What kind of business are you starting?" },
  { key: "location", label: "Location", value: "Kochi, Kerala", help: "Where do you sell or provide the service?" },
  { key: "targetAudience", label: "Target audience", value: "College students, professionals, startups, and small offices", help: "Who will normally buy from you?" },
  { key: "productCategory", label: "Product category", value: "Refurbished business laptops", help: "What products or services do you offer?" },
  { key: "priceRange", label: "Price range", value: "₹18,000 – ₹45,000", help: "How much will customers usually pay?" },
  { key: "mainPromise", label: "Main promise", value: "Premium performance. Smarter prices.", help: "Why should customers choose you?" },
];

export default function DemoStep2Business() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="text-[var(--va-text)]"
    >
      <h2 className="text-xl font-black sm:text-2xl">
        First, tell us about the business
      </h2>
      <p className="mt-2 text-base leading-7 text-[var(--va-text-secondary)]">
        You answer a few simple questions about your business. LaunchLoom uses
        your answers to create everything you need.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <div
            key={field.key}
            className={`rounded-xl border border-[var(--va-border)] bg-[var(--va-card)] p-4 ${
              field.key === "mainPromise" ? "sm:col-span-2" : ""
            }`}
          >
            <label className="text-sm font-bold text-[var(--va-text)]">
              {field.label}
            </label>
            <div className="mt-1.5 flex items-start gap-2">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--va-green)]" />
              <p className="text-sm text-[var(--va-text-secondary)]">{field.help}</p>
            </div>
            <div className="mt-2 rounded-xl border border-[var(--va-border)] bg-[var(--va-elevated)] px-4 py-3 text-sm font-semibold text-[var(--va-text)]">
              {field.value}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
