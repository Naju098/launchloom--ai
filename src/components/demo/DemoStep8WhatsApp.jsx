import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircleMore, Clock, Check } from "lucide-react";
import SimpleExplanation from "./SimpleExplanation";

const messages = [
  { timing: "Immediately", message: "Hi Arun, thank you for checking our ThinkPad T490. Would you like the inspection report and current price?", time: "11:32 AM" },
  { timing: "After one day", message: "Hi Arun, are you still looking for a programming laptop under ₹35,000? I can help you compare two suitable models.", time: "9:15 AM" },
  { timing: "After three days", message: "The ThinkPad T490 you viewed is currently available. Reply YES to reserve it or COMPARE to see another option.", time: "10:00 AM" },
];

export default function DemoStep8WhatsApp() {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (visible >= messages.length) return;
    const timer = setTimeout(() => setVisible((v) => v + 1), 1000 + visible * 200);
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
        Follow-up messages — sent automatically
      </h2>
      <p className="mt-2 text-base leading-7 text-[var(--va-text-secondary)]">
        LaunchLoom prepares follow-up messages so interested customers are not forgotten.
      </p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--va-border)] bg-[var(--va-card)] shadow-sm">
        <div className="flex items-center gap-3 border-b border-[var(--va-border)] bg-[var(--va-elevated)] px-5 py-3.5">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-[var(--va-teal)] text-xs font-bold text-[var(--va-base)]">
            A
          </div>
          <div>
            <p className="text-sm font-bold text-[var(--va-text)]">Arun</p>
            <p className="text-xs text-[var(--va-teal)]">Online</p>
          </div>
        </div>

        <div className="min-h-[260px] space-y-3 bg-[#0A0F0C] px-5 pb-5 pt-4">
          <AnimatePresence>
            {messages.slice(0, visible).map((msg, i) => (
              <motion.div
                key={msg.timing}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.05 }}
                className="flex justify-start"
              >
                <div className="max-w-[90%] rounded-2xl rounded-bl-sm bg-[var(--va-card)] px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3 text-[var(--va-text-muted)]" />
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--va-text-muted)]">
                      {msg.timing}
                    </p>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[var(--va-text-secondary)]">
                    {msg.message}
                  </p>
                  <div className="mt-1.5 flex items-center justify-end gap-1 text-[10px] text-[var(--va-text-muted)]">
                    <span>{msg.time}</span>
                    <Check className="h-3 w-3" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <SimpleExplanation delay={0.5}>
        <p className="font-semibold">Why this is useful:</p>
        <p className="mt-1">Many businesses lose customers because they forget to follow up. LaunchLoom creates reminder messages so every enquiry gets a response.</p>
      </SimpleExplanation>
    </motion.div>
  );
}
