import { motion } from "motion/react";
import { Palette, Info } from "lucide-react";
import { demoBrandOutput } from "../../data/demoData";
import SimpleExplanation from "./SimpleExplanation";

export default function DemoStep4Brand() {
  const data = demoBrandOutput;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="text-[var(--va-text)]"
    >
      <h2 className="text-xl font-black sm:text-2xl">
        Introducing your brand
      </h2>
      <p className="mt-2 text-base leading-7 text-[var(--va-text-secondary)]">
        Based on the business details you entered, LaunchLoom has created a name,
        a short description and colours for your brand.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-6 rounded-2xl bg-[var(--va-base)] p-6 text-white"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--va-green)]">
          Business name
        </p>
        <p className="mt-3 text-3xl font-black sm:text-4xl">{data.brandName}</p>
        <p className="mt-2 text-lg font-semibold text-[var(--va-green)]">
          {data.tagline}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-4 rounded-2xl border border-[var(--va-border)] bg-[var(--va-card)] p-5"
      >
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-[var(--va-green)]" />
          <p className="text-sm font-bold text-[var(--va-text)]">
            How customers should understand this business
          </p>
        </div>
        <p className="mt-2 text-sm leading-6 text-[var(--va-text-secondary)]">
          Reboot Kochi provides inspected business laptops for students,
          professionals and small offices that need dependable performance
          without paying the price of a new device.
        </p>
        <SimpleExplanation>
          <p className="font-semibold">Why this is useful:</p>
          <p className="mt-1">It keeps your website, advertisements and customer messages clear and consistent.</p>
        </SimpleExplanation>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-4 rounded-2xl border border-[var(--va-border)] bg-[var(--va-card)] p-5"
      >
        <div className="flex items-center gap-2">
          <Palette className="h-4 w-4 text-[var(--va-green)]" />
          <p className="text-sm font-bold text-[var(--va-text)]">Brand colours</p>
        </div>
        <p className="mt-2 text-xs leading-5 text-[var(--va-text-muted)]">
          These colours can be used on the website, logo, social media posts,
          product cards and advertisements.
        </p>
        <div className="mt-3 flex gap-2.5">
          {data.palette.map((colour) => (
            <div key={colour.hex} className="group relative">
              <div
                className="h-8 w-8 rounded-lg shadow-inner ring-1 ring-white/10"
                style={{ backgroundColor: colour.hex }}
              />
              <span className="pointer-events-none absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium text-[var(--va-text-muted)] opacity-0 transition-opacity group-hover:opacity-100">
                {colour.name}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
