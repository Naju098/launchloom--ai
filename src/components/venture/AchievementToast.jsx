import { useState, useEffect, useCallback, createContext, useContext } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, X } from "lucide-react";

const ToastContext = createContext();

let toastIdCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "success", duration = 3500) => {
    const id = ++toastIdCounter;
    setToasts((prev) => [...prev, { id, message, type, duration }]);
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Toast container */}
      <div
        className="pointer-events-none fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-2"
        aria-live="polite"
        aria-atomic="true"
      >
        <AnimatePresence>
          {toasts.map((toast) => (
            <ToastItem
              key={toast.id}
              toast={toast}
              onRemove={() => removeToast(toast.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onRemove }) {
  useEffect(() => {
    const timer = setTimeout(onRemove, toast.duration);
    return () => clearTimeout(timer);
  }, [toast.duration, onRemove]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      className="pointer-events-auto flex items-center gap-3 rounded-xl border border-[var(--va-border)] bg-[var(--va-elevated)] px-4 py-3 shadow-2xl shadow-black/40"
    >
      {toast.type === "success" && (
        <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--va-green)]" />
      )}
      <p className="text-sm font-medium text-[var(--va-text)]">{toast.message}</p>
      <button
        type="button"
        onClick={onRemove}
        className="grid h-6 w-6 shrink-0 place-items-center rounded-md text-[var(--va-text-muted)] transition hover:bg-white/10 hover:text-[var(--va-text)]"
        aria-label="Dismiss"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </motion.div>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
