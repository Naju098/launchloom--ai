import { motion } from "motion/react";
import { Package } from "lucide-react";
import { demoBrandOutput } from "../../data/demoData";
import SimpleExplanation from "./SimpleExplanation";

const productLabels = {
  1: { bestFor: "Office work and online classes", condition: "Excellent", warranty: "Six months" },
  2: { bestFor: "Programming and remote work", condition: "Very good", warranty: "Six months" },
  3: { bestFor: "Everyday business use", condition: "Good", warranty: "Three months" },
};

export default function DemoStep5Catalogue() {
  const products = demoBrandOutput.catalogue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="text-[var(--va-text)]"
    >
      <h2 className="text-xl font-black sm:text-2xl">
        Products LaunchLoom recommends
      </h2>
      <p className="mt-2 text-base leading-7 text-[var(--va-text-secondary)]">
        LaunchLoom organises the product information so customers can compare
        products without calling the shop for every detail.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, i) => {
          const labels = productLabels[product.id] || {};
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
              className="venture-card rounded-2xl p-5"
            >
              <div className="mb-3 flex items-start justify-between gap-2">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--va-green)]">
                    {product.category}
                  </p>
                  <h3 className="mt-1 text-lg font-black text-[var(--va-text)]">{product.name}</h3>
                </div>
                <div className="rounded-lg bg-[var(--va-green-dim)] px-2.5 py-1.5 text-center">
                  <p className="text-base font-black text-[var(--va-green)]">{product.score}</p>
                  <p className="text-[9px] font-bold uppercase text-[var(--va-green)]">Match</p>
                </div>
              </div>

              <div className="mt-3 space-y-2 text-sm text-[var(--va-text-secondary)]">
                <div className="flex justify-between">
                  <span className="text-[var(--va-text-muted)]">Best for:</span>
                  <span className="font-semibold text-[var(--va-text)]">{labels.bestFor || "General use"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--va-text-muted)]">Processor:</span>
                  <span className="font-semibold text-[var(--va-text)]">{product.specs.split("·")[0].trim()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--va-text-muted)]">RAM:</span>
                  <span className="font-semibold text-[var(--va-text)]">{product.specs.match(/\d+GB/)?.[0] || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--va-text-muted)]">Storage:</span>
                  <span className="font-semibold text-[var(--va-text)]">{product.specs.match(/\d+GB\s*SSD/)?.[0] || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--va-text-muted)]">Condition:</span>
                  <span className="font-semibold text-[var(--va-text)]">{labels.condition || "Inspected"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--va-text-muted)]">Warranty:</span>
                  <span className="font-semibold text-[var(--va-text)]">{labels.warranty || "Standard"}</span>
                </div>
              </div>

              <div className="mt-4 border-t border-[var(--va-border)] pt-3">
                <p className="text-2xl font-black text-[var(--va-text)]">{product.price}</p>
                <p className="mt-0.5 text-xs text-[var(--va-text-muted)]">{product.originalPrice}</p>
              </div>

              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[var(--va-green-dim)] px-3 py-1 text-xs font-bold text-[var(--va-green)]">
                <Package className="h-3 w-3" />
                {product.badge}
              </div>
            </motion.div>
          );
        })}
      </div>

      <SimpleExplanation delay={0.4}>
        <p className="font-semibold">Why this is useful:</p>
        <p className="mt-1">Customers can see all the important details at once — processor, RAM, price, warranty — without calling the shop for every product.</p>
      </SimpleExplanation>
    </motion.div>
  );
}
