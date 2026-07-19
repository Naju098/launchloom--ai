import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bot, Check, Clock } from "lucide-react";
import SimpleExplanation from "./SimpleExplanation";

const messages = [
  { sender: "customer", text: "I need a laptop for programming under ₹35,000." },
  { sender: "assistant", text: "The Lenovo ThinkPad T490 is a strong match for your budget. It includes 16 GB RAM, 512 GB SSD and a six-month warranty." },
  { sender: "assistant", text: "Would you like the full specifications or a WhatsApp call from the store?" },
];

export default function DemoStep7Chatbot() {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (visible >= messages.length) return;
    const timer = setTimeout(() => setVisible((v) => v + 1), 900 + visible * 100);
    return () => clearTimeout(timer);
  }, [visible]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="text-[var(--va-text)]"
    >
      <h2 className="text-xl font-black sm:text-2xl">
        Sales assistant — answers customer questions
      </h2>
      <p className="mt-2 text-base leading-7 text-[var(--va-text-secondary)]">
        The assistant answers common questions, recommends suitable products and
        helps the customer take the next step.
      </p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--va-border)] bg-[var(--va-card)] shadow-sm">
        <div className="flex items-center gap-2.5 border-b border-[var(--va-border)] bg-[var(--va-elevated)] px-5 py-3.5">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--va-violet)]/10 text-[var(--va-violet)]">
            <Bot className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-bold text-[var(--va-text)]">Reboot Kochi assistant</p>
            <p className="text-xs text-[var(--va-text-muted)]">Online — replies instantly</p>
          </div>
        </div>

        <div className="min-h-[280px] space-y-3 bg-[var(--va-base)] px-5 pb-5 pt-4">
          <AnimatePresence>
            {messages.slice(0, visible).map((msg, i) => (
              <motion.div
                key={`${msg.sender}-${i}`}
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className={`flex ${msg.sender === "customer" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                    msg.sender === "customer"
                      ? "rounded-br-sm bg-[var(--va-green-dim)] text-[var(--va-green)]"
                      : "rounded-bl-sm bg-[var(--va-elevated)] text-[var(--va-text-secondary)]"
                  }`}
                >
                  <p>{msg.text}</p>
                  <p className="mt-1.5 flex items-center gap-1 text-[10px] text-[var(--va-text-muted)]">
                    {msg.sender === "customer" ? (
                      <><Check className="h-3 w-3" /> Delivered</>
                    ) : (
                      <><Clock className="h-3 w-3" /> Just now</>
                    )}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {visible <= messages.length && (
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="ml-2 h-4 w-8 rounded-full bg-[var(--va-border)]"
            />
          )}
        </div>
      </div>

      <SimpleExplanation delay={visible >= messages.length ? 0.3 : 0.5}>
        <p className="font-semibold">Why this is useful:</p>
        <p className="mt-1">The assistant works like a helpful shop employee — it answers common questions and recommends the right product without the customer waiting.</p>
      </SimpleExplanation>
    </motion.div>
  );
}
