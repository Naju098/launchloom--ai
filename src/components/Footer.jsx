import { motion } from "motion/react";
import BrandLogo from "./BrandLogo";

const productLinks = [
  { label: "Launch Studio", href: "#brand-builder" },
  { label: "Brand Showcase", href: "#showcase" },
  { label: "Sales Automation", href: "#automation" },
  { label: "Lead Dashboard", href: "#leads" },
];

const resources = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Demo guide", href: "#metrics" },
  { label: "API documentation", href: "#" },
];

const company = [
  { label: "Privacy policy", href: "#" },
  { label: "Terms of service", href: "#" },
  { label: "Contact", href: "#" },
  { label: "Demo disclaimer", href: "#" },
];

function FooterLink({ href, children }) {
  return (
    <li>
      <motion.a
        href={href}
        whileHover={{ x: 4 }}
        className="relative inline-block text-sm font-medium text-[var(--loom-lilac)] transition-all duration-200 hover:text-white"
      >
        <span className="relative">
          {children}
          <motion.span
            className="absolute -bottom-0.5 left-0 h-px bg-white"
            initial={{ width: "0%" }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.2 }}
          />
        </span>
      </motion.a>
    </li>
  );
}

function FooterColumn({ title, links }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--loom-lilac)]/60">
        {title}
      </p>
      <ul className="mt-4 space-y-2.5">
        {links.map((link, i) => (
          <motion.li
            key={link.label}
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
          >
            <FooterLink href={link.href}>{link.label}</FooterLink>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#2B2430]">
      <div className="section-divider-glow" />

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-8 py-12 sm:grid-cols-2 md:grid-cols-4">
          <motion.div
            className="sm:col-span-2 md:col-span-1"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <BrandLogo />
            <p className="mt-4 text-sm leading-6 text-[var(--loom-lilac)]">
              LaunchLoom AI transforms raw business ideas into launch-ready brand
              systems, product catalogues, sales workflows, and lead dashboards.
            </p>
            <p className="mt-4 text-xs text-[var(--loom-lilac)]/60">
              Built as a polished product demo.
              <br />
              Connect your AI backend for live generation.
            </p>
          </motion.div>

          <FooterColumn title="Product" links={productLinks} />
          <FooterColumn title="Resources" links={resources} />
          <FooterColumn title="Company" links={company} />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center justify-between border-t border-white/10 py-6 text-xs text-[var(--loom-lilac)]/60 sm:flex-row"
        >
          <p>&copy; {new Date().getFullYear()} LaunchLoom AI. Demo application.</p>
          <motion.p
            className="mt-2 sm:mt-0"
            whileHover={{ color: "rgba(255,255,255,0.6)" }}
          >
            Built with React, Tailwind CSS, and Motion.
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
}
