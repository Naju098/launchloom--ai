import { useState } from "react";
import { motion } from "motion/react";
import {
  Bot,
  CheckCircle2,
  Copy,
  LayoutTemplate,
  MessageCircleMore,
  Palette,
  Target,
  Sparkles,
  Package,
  Users,
} from "lucide-react";
import ProductRecommendations from "./ProductRecommendations";
import LeadCapture from "./LeadCapture";

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

function ResultCard({ icon: Icon, title, children, className = "", index = 0, accent = "text-[var(--va-green)]", accentBg = "bg-[var(--va-green-dim)]" }) {
  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      custom={index * 0.06}
      variants={cardVariants}
      whileHover={{ y: -3 }}
      className={`venture-card rounded-2xl p-6 ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className={`grid h-10 w-10 place-items-center rounded-xl ${accentBg} ${accent}`}>
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="font-black text-[var(--va-text)]">{title}</h3>
      </div>
      <div className="mt-5">{children}</div>
    </motion.article>
  );
}

export default function GenerationResults({ data, onLeadSubmit }) {
  const [activeTab, setActiveTab] = useState("brand");

  const copyText = async (text) => {
    await navigator.clipboard.writeText(text);
  };

  const tabs = [
    { id: "brand", label: "Brand", icon: Palette },
    { id: "products", label: "Products", icon: Package },
    { id: "website", label: "Website", icon: LayoutTemplate },
    { id: "sales", label: "Sales", icon: Bot },
    { id: "customers", label: "Customers", icon: Users },
  ];

  const progressItems = [
    { label: "Identity", done: true },
    { label: "Products", done: true },
    { label: "Website", done: true },
    { label: "Messages", done: true },
    { label: "Customers", done: true },
  ];

  return (
    <section id="generated-results" className="mx-auto max-w-7xl px-5 pb-24 pt-6 lg:px-8">
      <div className="rounded-2xl border border-[var(--va-border)] bg-[var(--va-panel)] p-6 shadow-2xl shadow-black/20 sm:p-9">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-lg border border-[var(--va-green)]/20 bg-[var(--va-green-dim)] px-4 py-2 text-xs font-bold text-[var(--va-green)]">
            <Sparkles className="h-3.5 w-3.5" />
            Your launch assets are ready
          </div>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.03em] text-[var(--va-text)] sm:text-4xl">
            Unlocked assets
          </h2>
          <p className="mt-2 text-base text-[var(--va-text-secondary)]">
            Generated for {data.sourceInput.businessType} in {data.sourceInput.location}
          </p>
        </motion.div>

        {/* Progress summary */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {progressItems.map(({ label, done }) => (
            <span
              key={label}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-bold ${
                done
                  ? "bg-[var(--va-green-dim)] text-[var(--va-green)]"
                  : "bg-[var(--va-elevated)] text-[var(--va-text-muted)]"
              }`}
            >
              {done && <CheckCircle2 className="h-3 w-3" />}
              {label}
            </span>
          ))}
        </div>

        {/* Tabs */}
        <div className="mt-8 flex flex-wrap gap-2 border-b border-[var(--va-border)] pb-4">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-bold transition ${
                activeTab === id
                  ? "bg-[var(--va-green-dim)] text-[var(--va-green)]"
                  : "text-[var(--va-text-muted)] hover:text-[var(--va-text)]"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="mt-7 grid gap-5 lg:grid-cols-12">
          {/* Brand identity hero card */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -3 }}
            className="relative overflow-hidden rounded-2xl bg-[var(--va-base)] p-7 text-white shadow-lg lg:col-span-7"
          >
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[var(--va-green)]/10 blur-3xl" />
            <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-[var(--va-amber)]/5 blur-3xl" />
            <p className="relative text-xs font-black uppercase tracking-[0.2em] text-[var(--va-green)]">
              Brand identity
            </p>
            <h3 className="relative mt-6 text-5xl font-black tracking-[-0.05em] sm:text-6xl">
              {data.brandName}
            </h3>
            <p className="relative mt-4 text-xl font-semibold text-[var(--va-text-secondary)]">
              {data.tagline}
            </p>
            <p className="relative mt-7 max-w-3xl leading-7 text-[var(--va-text-muted)]">
              {data.positioning}
            </p>
            <motion.button
              type="button"
              onClick={() => copyText(`${data.brandName}\n${data.tagline}\n${data.positioning}`)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="relative mt-7 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white/20"
            >
              <Copy className="h-3.5 w-3.5" />
              Copy positioning
            </motion.button>
          </motion.article>

          {/* Colour palette */}
          <ResultCard icon={Palette} title="Colour palette" className="lg:col-span-5" index={1} accent="text-[var(--va-teal)]" accentBg="bg-[var(--va-teal)]/10">
            <div className="space-y-3">
              {data.palette.map((colour) => (
                <div key={colour.hex} className="flex items-center justify-between rounded-xl bg-[var(--va-elevated)] p-3 transition-colors hover:bg-[var(--va-card-hover)]">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-10 w-10 rounded-xl shadow-inner ring-1 ring-white/10"
                      style={{ backgroundColor: colour.hex }}
                    />
                    <div>
                      <p className="text-sm font-black text-[var(--va-text)]">{colour.name}</p>
                      <p className="text-xs text-[var(--va-text-muted)]">{colour.hex}</p>
                    </div>
                  </div>
                  <motion.button
                    type="button"
                    onClick={() => copyText(colour.hex)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="grid h-9 w-9 place-items-center rounded-xl text-[var(--va-text-muted)] hover:bg-white/5 hover:text-[var(--va-green)]"
                  >
                    <Copy className="h-4 w-4" />
                  </motion.button>
                </div>
              ))}
            </div>
          </ResultCard>

          {/* Target audience */}
          <ResultCard icon={Target} title="Target audience" className="lg:col-span-5" index={2} accent="text-[var(--va-amber)]" accentBg="bg-[var(--va-amber)]/10">
            <div className="space-y-3">
              {data.audiences.map((audience) => (
                <div key={audience.name} className="rounded-xl border border-[var(--va-border)] bg-[var(--va-elevated)] p-4 transition-colors hover:border-[var(--va-green)]/20">
                  <p className="font-black text-[var(--va-text)]">{audience.name}</p>
                  <p className="mt-1.5 text-sm leading-6 text-[var(--va-text-secondary)]">{audience.need}</p>
                </div>
              ))}
            </div>
          </ResultCard>

          {/* Landing page sections */}
          <ResultCard icon={LayoutTemplate} title="Landing page sections" className="lg:col-span-7" index={3} accent="text-[var(--va-coral)]" accentBg="bg-[var(--va-coral)]/10">
            <div className="grid gap-3 sm:grid-cols-2">
              {data.landingSections.map((section, index) => (
                <div key={section.title} className="rounded-xl bg-[var(--va-elevated)] p-4 transition-colors hover:bg-[var(--va-card-hover)]">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-black uppercase tracking-[0.17em] text-[var(--va-green)]">
                      0{index + 1}
                    </p>
                    <span className="rounded-md bg-[var(--va-green-dim)] px-2.5 py-1 text-[10px] font-bold text-[var(--va-green)]">
                      {section.title}
                    </span>
                  </div>
                  <p className="mt-3 text-sm font-semibold leading-6 text-[var(--va-text-secondary)]">
                    {section.copy}
                  </p>
                  <p className="mt-3 text-xs font-bold text-[var(--va-green)]">CTA: {section.cta}</p>
                </div>
              ))}
            </div>
          </ResultCard>

          {/* Sales chatbot */}
          <ResultCard icon={Bot} title="Sales chatbot script" className="lg:col-span-6" index={4} accent="text-[var(--va-violet)]" accentBg="bg-[var(--va-violet)]/10">
            <div className="space-y-3 rounded-xl bg-[var(--va-elevated)] p-4">
              {data.chatbotScript.map((message, index) => (
                <motion.div
                  key={`${message.sender}-${index}`}
                  initial={{ opacity: 0, x: message.sender === "user" ? 12 : -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <p
                    className={`max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                      message.sender === "user"
                        ? "rounded-br-md bg-[var(--va-green-dim)] text-[var(--va-green)]"
                        : "rounded-bl-md bg-[var(--va-card)] text-[var(--va-text-secondary)] shadow-sm"
                    }`}
                  >
                    {message.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </ResultCard>

          {/* WhatsApp follow-up */}
          <ResultCard icon={MessageCircleMore} title="WhatsApp follow-up" className="lg:col-span-6" index={5} accent="text-[var(--va-green)]" accentBg="bg-[var(--va-green)]/10">
            <div className="space-y-4">
              {data.whatsappMessages.map((item) => (
                <motion.div
                  key={item.timing}
                  whileHover={{ x: 4 }}
                  className="rounded-xl border border-[var(--va-green)]/10 bg-[var(--va-green-dim)]/30 p-4 transition-shadow hover:shadow-md"
                >
                  <p className="text-xs font-black uppercase tracking-[0.17em] text-[var(--va-green)]">
                    {item.timing}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--va-text-secondary)]">{item.message}</p>
                </motion.div>
              ))}
            </div>
          </ResultCard>
        </div>

        <ProductRecommendations products={data.catalogue} />
        <LeadCapture products={data.catalogue} onSubmit={onLeadSubmit} />
      </div>
    </section>
  );
}
