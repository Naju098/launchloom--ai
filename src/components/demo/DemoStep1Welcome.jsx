import { motion } from "motion/react";
import { Store, MapPin, Users, IndianRupee, ShieldCheck } from "lucide-react";

export default function DemoStep1Welcome({ onStart }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center text-center text-[var(--va-text)]"
    >
      <div className="mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-[var(--va-green-dim)] text-[var(--va-green)]">
        <Store className="h-8 w-8" />
      </div>

      <h2 className="text-2xl font-black sm:text-3xl">
        See how LaunchLoom builds a business
      </h2>
      <p className="mx-auto mt-3 max-w-lg text-base leading-7 text-[var(--va-text-secondary)]">
        We will use a used-laptop shop in Kochi as an example. Watch how a simple
        idea becomes a complete business launch kit.
      </p>

      <div className="mt-8 grid w-full gap-3 sm:grid-cols-2">
        {[
          { icon: Store, label: "Business", value: "Used-laptop store" },
          { icon: MapPin, label: "Location", value: "Kochi, Kerala" },
          { icon: Users, label: "Customers", value: "Students, professionals and small businesses" },
          { icon: IndianRupee, label: "Price range", value: "₹18,000 – ₹45,000" },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-3 rounded-xl border border-[var(--va-border)] bg-[var(--va-card)] p-4 text-left shadow-sm">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[var(--va-green-dim)] text-[var(--va-green)]">
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[var(--va-text-muted)]">{label}</p>
              <p className="text-sm font-semibold text-[var(--va-text)]">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-2 rounded-xl bg-[var(--va-amber)]/10 px-5 py-3 text-sm font-semibold text-[var(--va-amber)]">
        <ShieldCheck className="h-4 w-4 shrink-0" />
        Main promise: Reliable laptops at smarter prices
      </div>

      <motion.button
        type="button"
        onClick={onStart}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[var(--va-green)] px-8 py-3.5 text-sm font-bold text-[var(--va-base)] shadow-lg shadow-[var(--va-green)]/20 transition-all hover:brightness-110"
      >
        Start the demo
      </motion.button>
    </motion.div>
  );
}
