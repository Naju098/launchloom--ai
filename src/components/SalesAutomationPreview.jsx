import { motion } from "motion/react";
import { Bot, MessageCircleMore, Check, Clock, ChevronRight } from "lucide-react";
import { demoBrandOutput } from "../data/demoData";

export default function SalesAutomationPreview() {
  const { chatbotScript, whatsappMessages } = demoBrandOutput;

  return (
    <section className="border-y border-[var(--va-border)] bg-[var(--va-panel)]/50">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--va-green)]">
            Communication command centre
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-[var(--va-text)] sm:text-4xl">
            Chatbot + WhatsApp follow-ups
          </h2>
          <p className="mt-3 text-base leading-7 text-[var(--va-text-secondary)]">
            Pre-built sales conversations that qualify leads automatically.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* ── Chatbot column ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="overflow-hidden rounded-2xl border border-[var(--va-border)] bg-[var(--va-card)] shadow-sm"
          >
            <div className="flex items-center gap-2.5 border-b border-[var(--va-border)] bg-[var(--va-elevated)] px-5 py-3.5">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--va-violet)]/10 text-[var(--va-violet)]">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-[var(--va-text)]">Sales chatbot</p>
                <p className="text-xs text-[var(--va-text-muted)]">Live chat preview</p>
              </div>
            </div>
            <div className="space-y-3 bg-[var(--va-base)] px-5 pb-5 pt-4">
              {chatbotScript.map((msg, i) => (
                <motion.div
                  key={`${msg.sender}-${i}`}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-6 ${
                      msg.sender === "user"
                        ? "rounded-br-sm bg-[var(--va-green-dim)] text-[var(--va-green)]"
                        : "rounded-bl-sm bg-[var(--va-elevated)] text-[var(--va-text-secondary)]"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p className="mt-1 flex items-center gap-1 text-[10px] text-[var(--va-text-muted)]">
                      {msg.sender === "user" ? (
                        <>
                          <Check className="h-3 w-3" />
                          Delivered
                        </>
                      ) : (
                        <>
                          <Clock className="h-3 w-3" />
                          Just now
                        </>
                      )}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── WhatsApp column ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="overflow-hidden rounded-2xl border border-[var(--va-border)] bg-[var(--va-card)] shadow-sm"
          >
            <div className="flex items-center gap-2.5 border-b border-[var(--va-border)] bg-[var(--va-elevated)] px-5 py-3.5">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--va-green-dim)] text-[var(--va-green)]">
                <MessageCircleMore className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-[var(--va-text)]">WhatsApp follow-ups</p>
                <p className="text-xs text-[var(--va-text-muted)]">Automated sequence</p>
              </div>
            </div>
            <div className="space-y-3 bg-[#0A0F0C] px-5 pb-5 pt-4">
              {whatsappMessages.map((item, i) => (
                <motion.div
                  key={item.timing}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.3 }}
                  whileHover={{ x: 3 }}
                  className="rounded-xl border border-[var(--va-green)]/10 bg-[var(--va-green-dim)]/20 p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-[var(--va-text-muted)]" />
                      <p className="text-xs font-bold uppercase tracking-wider text-[var(--va-text-muted)]">
                        {item.timing}
                      </p>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-[var(--va-text-muted)]" />
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[var(--va-text-secondary)]">
                    {item.message}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
