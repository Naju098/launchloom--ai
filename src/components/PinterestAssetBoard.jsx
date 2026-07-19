import { motion } from "motion/react";
import {
  Palette,
  Package,
  LayoutTemplate,
  Bot,
  MessageCircleMore,
  Users,
  Eye,
  Target,
  CheckCircle2,
} from "lucide-react";
import { demoBrandOutput } from "../data/demoData";
import AssetCard from "./AssetCard";

export default function PinterestAssetBoard() {
  const { catalogue, palette } = demoBrandOutput;

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl text-center"
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--va-green)]">
          Discovery board
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-[var(--va-text)] sm:text-4xl">
          Everything your idea can become
        </h2>
        <p className="mt-3 text-base leading-7 text-[var(--va-text-secondary)]">
          A complete business system — not just a logo or a tagline.
        </p>
      </motion.div>

      {/* Masonry-style grid */}
      <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {/* Brand identity — tall */}
        <AssetCard
          icon={Palette}
          title="Brand identity"
          subtitle="Unlocked"
          accent="text-[var(--va-teal)]"
          accentBg="bg-[var(--va-teal)]/10"
          index={0}
          className="break-inside-avoid"
        >
          <div className="rounded-xl bg-[var(--va-elevated)] p-4">
            <p className="text-lg font-black text-[var(--va-text)]">Reboot Kochi</p>
            <p className="mt-1 text-xs text-[var(--va-text-secondary)]">Reliable laptops. Smarter prices.</p>
            <div className="mt-3 flex gap-2">
              {palette.slice(0, 4).map((c) => (
                <div
                  key={c.hex}
                  className="h-6 w-6 rounded-lg shadow-inner"
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>
        </AssetCard>

        {/* Product — wide */}
        <AssetCard
          icon={Package}
          title="Product collection"
          subtitle={`${catalogue.length} items`}
          accent="text-[var(--va-amber)]"
          accentBg="bg-[var(--va-amber)]/10"
          index={1}
          className="break-inside-avoid"
        >
          <div className="space-y-2">
            {catalogue.map((p) => (
              <div key={p.id} className="flex items-center justify-between rounded-lg bg-[var(--va-elevated)] px-3 py-2">
                <div>
                  <p className="text-xs font-bold text-[var(--va-text)]">{p.name}</p>
                  <p className="text-[10px] text-[var(--va-text-muted)]">{p.specs}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-[var(--va-green)]">{p.score}%</p>
                  <p className="text-[10px] text-[var(--va-text-muted)]">{p.price}</p>
                </div>
              </div>
            ))}
          </div>
        </AssetCard>

        {/* Website sections */}
        <AssetCard
          icon={LayoutTemplate}
          title="Website sections"
          subtitle="7 ready"
          accent="text-[var(--va-coral)]"
          accentBg="bg-[var(--va-coral)]/10"
          index={2}
          className="break-inside-avoid"
        >
          <div className="grid grid-cols-2 gap-1.5">
            {["Hero", "Trust", "Products", "Reviews", "Warranty", "Contact", "CTA"].map((s) => (
              <div key={s} className="rounded-md bg-[var(--va-elevated)] px-2.5 py-2 text-center text-[10px] font-semibold text-[var(--va-text-secondary)]">
                {s}
              </div>
            ))}
          </div>
        </AssetCard>

        {/* Sales chatbot */}
        <AssetCard
          icon={Bot}
          title="Sales chatbot"
          subtitle="Live"
          accent="text-[var(--va-violet)]"
          accentBg="bg-[var(--va-violet)]/10"
          index={3}
          className="break-inside-avoid"
        >
          <div className="space-y-2">
            <div className="rounded-2xl rounded-bl-sm bg-[var(--va-elevated)] px-3 py-2 text-xs text-[var(--va-text-secondary)]">
              Hi! I can help you choose a laptop in under two minutes.
            </div>
            <div className="flex justify-end">
              <div className="rounded-2xl rounded-br-sm bg-[var(--va-green-dim)] px-3 py-2 text-xs text-[var(--va-green)]">
                I need a laptop for programming under ₹35,000.
              </div>
            </div>
          </div>
        </AssetCard>

        {/* WhatsApp follow-up */}
        <AssetCard
          icon={MessageCircleMore}
          title="WhatsApp follow-up"
          subtitle="3 messages"
          accent="text-[var(--va-green)]"
          accentBg="bg-[var(--va-green)]/10"
          index={4}
          className="break-inside-avoid"
        >
          <div className="space-y-2">
            {["Immediately", "After 1 day", "After 3 days"].map((t) => (
              <div key={t} className="flex items-center gap-2 rounded-lg bg-[var(--va-elevated)] px-3 py-2">
                <CheckCircle2 className="h-3 w-3 shrink-0 text-[var(--va-green)]" />
                <span className="text-[10px] text-[var(--va-text-secondary)]">{t}</span>
              </div>
            ))}
          </div>
        </AssetCard>

        {/* Customer enquiries */}
        <AssetCard
          icon={Users}
          title="Customer enquiries"
          subtitle="Dashboard"
          accent="text-[var(--va-amber)]"
          accentBg="bg-[var(--va-amber)]/10"
          index={5}
          className="break-inside-avoid"
        >
          <div className="space-y-2">
            {[
              { name: "Arjun", req: "Programming laptop", budget: "₹35,000" },
              { name: "Meera", req: "Remote work", budget: "₹25,000" },
            ].map((l) => (
              <div key={l.name} className="flex items-center justify-between rounded-lg bg-[var(--va-elevated)] px-3 py-2">
                <div>
                  <p className="text-xs font-bold text-[var(--va-text)]">{l.name}</p>
                  <p className="text-[10px] text-[var(--va-text-muted)]">{l.req}</p>
                </div>
                <span className="text-[10px] font-bold text-[var(--va-coral)]">{l.budget}</span>
              </div>
            ))}
          </div>
        </AssetCard>

        {/* Colour palette */}
        <AssetCard
          icon={Eye}
          title="Colour palette"
          subtitle="5 colours"
          accent="text-[var(--va-teal)]"
          accentBg="bg-[var(--va-teal)]/10"
          index={6}
          className="break-inside-avoid"
        >
          <div className="space-y-2">
            {palette.map((c) => (
              <div key={c.hex} className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-lg shadow-inner" style={{ backgroundColor: c.hex }} />
                <div>
                  <p className="text-xs font-semibold text-[var(--va-text)]">{c.name}</p>
                  <p className="text-[10px] text-[var(--va-text-muted)]">{c.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </AssetCard>

        {/* Target customers */}
        <AssetCard
          icon={Target}
          title="Target customers"
          subtitle="3 groups"
          accent="text-[var(--va-coral)]"
          accentBg="bg-[var(--va-coral)]/10"
          index={7}
          className="break-inside-avoid"
        >
          <div className="space-y-2">
            {["College students", "Young professionals", "Startups & offices"].map((g) => (
              <div key={g} className="rounded-lg bg-[var(--va-elevated)] px-3 py-2 text-xs text-[var(--va-text-secondary)]">
                {g}
              </div>
            ))}
          </div>
        </AssetCard>

        {/* Launch checklist */}
        <AssetCard
          icon={CheckCircle2}
          title="Launch checklist"
          subtitle="6 levels"
          accent="text-[var(--va-green)]"
          accentBg="bg-[var(--va-green)]/10"
          index={8}
          className="break-inside-avoid"
        >
          <div className="space-y-1.5">
            {["Business idea", "Brand identity", "Product catalogue", "Website structure", "Sales messages", "Customer system"].map((l) => (
              <div key={l} className="flex items-center gap-2 text-xs">
                <CheckCircle2 className="h-3 w-3 text-[var(--va-green)]" />
                <span className="text-[var(--va-text-secondary)]">{l}</span>
              </div>
            ))}
          </div>
        </AssetCard>
      </div>
    </section>
  );
}
