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

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#2B2430]">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-8 py-12 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand column */}
          <div className="sm:col-span-2 md:col-span-1">
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
          </div>

          {/* Product */}
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--loom-lilac)]/60">
              Product
            </p>
            <ul className="mt-4 space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm font-medium text-[var(--loom-lilac)] transition hover:text-[var(--loom-pink)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--loom-lilac)]/60">
              Resources
            </p>
            <ul className="mt-4 space-y-2.5">
              {resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm font-medium text-[var(--loom-lilac)] transition hover:text-[var(--loom-pink)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--loom-lilac)]/60">
              Company
            </p>
            <ul className="mt-4 space-y-2.5">
              {company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm font-medium text-[var(--loom-lilac)] transition hover:text-[var(--loom-pink)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between border-t border-white/10 py-6 text-xs text-[var(--loom-lilac)]/60 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} LaunchLoom AI. Demo application.</p>
          <p className="mt-2 sm:mt-0">
            Built with React, Tailwind CSS, and Motion.
          </p>
        </div>
      </div>
    </footer>
  );
}
