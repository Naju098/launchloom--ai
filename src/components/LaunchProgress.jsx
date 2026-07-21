import { motion } from "motion/react";
import {
  Lightbulb,
  Palette,
  Package,
  LayoutTemplate,
  MessageCircleMore,
  Users,
  CheckCircle2,
  Lock,
  Play,
} from "lucide-react";

const levels = [
  {
    id: "idea",
    number: 1,
    title: "Business idea",
    description: "Tell LaunchLoom about your business",
    icon: Lightbulb,
    accent: "text-[var(--va-amber)]",
    border: "border-[var(--va-amber)]/20",
    bg: "bg-[var(--va-amber)]/10",
  },
  {
    id: "brand",
    number: 2,
    title: "Brand identity",
    description: "Name, colours and brand direction",
    icon: Palette,
    accent: "text-[var(--va-teal)]",
    border: "border-[var(--va-teal)]/20",
    bg: "bg-[var(--va-teal)]/10",
  },
  {
    id: "products",
    number: 3,
    title: "Product catalogue",
    description: "Products organised and priced",
    icon: Package,
    accent: "text-[var(--va-green)]",
    border: "border-[var(--va-green)]/20",
    bg: "bg-[var(--va-green)]/10",
  },
  {
    id: "website",
    number: 4,
    title: "Website structure",
    description: "Sections for the business website",
    icon: LayoutTemplate,
    accent: "text-[var(--va-coral)]",
    border: "border-[var(--va-coral)]/20",
    bg: "bg-[var(--va-coral)]/10",
  },
  {
    id: "messages",
    number: 5,
    title: "Sales messages",
    description: "Chatbot + WhatsApp follow-ups",
    icon: MessageCircleMore,
    accent: "text-[var(--va-violet)]",
    border: "border-[var(--va-violet)]/20",
    bg: "bg-[var(--va-violet)]/10",
  },
  {
    id: "customers",
    number: 6,
    title: "Customer system",
    description: "Enquiry tracking and dashboard",
    icon: Users,
    accent: "text-[var(--va-amber)]",
    border: "border-[var(--va-amber)]/20",
    bg: "bg-[var(--va-amber)]/10",
  },
];

export default function LaunchProgress({ currentLevel = 1, className = "" }) {
  return (
    <div className={`space-y-2 ${className}`}>
      <motion.p
        className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--va-text-muted)]"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        Launch progress
      </motion.p>
      <div className="space-y-1.5">
        {levels.map((level, i) => {
          const Icon = level.icon;
          const isCompleted = i + 1 < currentLevel;
          const isActive = i + 1 === currentLevel;
          const isLocked = i + 1 > currentLevel;

          return (
            <motion.div
              key={level.id}
              initial={false}
              animate={{
                opacity: isLocked ? 0.4 : 1,
                x: isActive ? [0, 2, 0] : 0,
              }}
              transition={isActive ? { duration: 2, repeat: Infinity } : {}}
              whileHover={!isLocked ? { x: 2 } : {}}
              className={`flex items-center gap-2.5 rounded-lg border px-3 py-2 transition-all ${
                isActive
                  ? `${level.border} ${level.bg}`
                  : "border-transparent"
              }`}
            >
              {/* Icon with animation */}
              <motion.div
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg ${
                  isCompleted
                    ? "bg-[var(--va-green)]/15 text-[var(--va-green)]"
                    : isActive
                      ? `${level.bg} ${level.accent}`
                      : "text-[var(--va-text-muted)]"
                }`}
                animate={isActive ? { scale: [1, 1.05, 1] } : {}}
                transition={isActive ? { duration: 2, repeat: Infinity } : {}}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-3.5 w-3.5" />
                ) : (
                  <Icon className="h-3.5 w-3.5" />
                )}
              </motion.div>

              {/* Label */}
              <div className="flex-1 min-w-0">
                <p
                  className={`text-xs font-semibold truncate ${
                    isCompleted
                      ? "text-[var(--va-green)]"
                      : isActive
                        ? "text-[var(--va-text)]"
                        : "text-[var(--va-text-muted)]"
                  }`}
                >
                  {level.title}
                </p>
              </div>

              {/* Status badge */}
              {isCompleted && (
                <motion.span
                  className="text-[9px] font-bold text-[var(--va-green)]"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  Done
                </motion.span>
              )}
              {isActive && (
                <motion.span
                  className="text-[9px] font-bold text-[var(--va-green)]"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Active
                </motion.span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
