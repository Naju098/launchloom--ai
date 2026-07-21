import { motion } from "motion/react";

/**
 * Reusable scroll-triggered reveal wrapper.
 * Animates children with fade-up when they enter the viewport.
 *
 * @param {object} props
 * @param {'fade' | 'slide-up' | 'slide-left' | 'slide-right' | 'scale' | 'blur' | 'flip' | 'spiral'} props.variant - Animation variant
 * @param {number} props.delay - Delay before animation starts (seconds)
 * @param {number} props.y - Starting y offset for slide animations
 * @param {number} props.duration - Animation duration (seconds)
 * @param {boolean} props.once - Whether to only animate once
 * @param {number} props.stagger - Stagger delay between children (seconds)
 * @param {number} props.amount - viewport amount (0-1)
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 24,
  duration = 0.5,
  once = true,
  variant = "fade",
  stagger = 0,
  amount = 0.15,
}) {
  const getInitial = () => {
    switch (variant) {
      case "slide-up": return { opacity: 0, y };
      case "slide-left": return { opacity: 0, x: 30 };
      case "slide-right": return { opacity: 0, x: -30 };
      case "scale": return { opacity: 0, scale: 0.92 };
      case "blur": return { opacity: 0, filter: "blur(8px)", y: 12 };
      case "flip": return { opacity: 0, rotateX: 20, y: 20 };
      case "spiral": return { opacity: 0, scale: 0.95, rotate: -3, y: 20 };
      default: return { opacity: 0, y };
    }
  };

  const getAnimate = () => {
    switch (variant) {
      case "slide-up": return { opacity: 1, y: 0 };
      case "slide-left": return { opacity: 1, x: 0 };
      case "slide-right": return { opacity: 1, x: 0 };
      case "scale": return { opacity: 1, scale: 1 };
      case "blur": return { opacity: 1, filter: "blur(0px)", y: 0 };
      case "flip": return { opacity: 1, rotateX: 0, y: 0 };
      case "spiral": return { opacity: 1, scale: 1, rotate: 0, y: 0 };
      default: return { opacity: 1, y: 0 };
    }
  };

  // Stagger mode
  if (stagger > 0) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: stagger,
              delayChildren: delay,
            },
          },
        }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Staggered child item — must be used inside a <Reveal stagger={...}> parent.
 */
export function RevealItem({
  children,
  className = "",
  variant = "fade",
  y = 20,
}) {
  const getVariants = () => {
    switch (variant) {
      case "slide-up":
        return {
          hidden: { opacity: 0, y },
          visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
        };
      case "slide-left":
        return {
          hidden: { opacity: 0, x: 20 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
        };
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0.95 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
        };
      case "blur":
        return {
          hidden: { opacity: 0, filter: "blur(6px)" },
          visible: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
        };
      default:
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
        };
    }
  };

  return (
    <motion.div variants={getVariants()} className={className}>
      {children}
    </motion.div>
  );
}
