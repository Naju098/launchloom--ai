import { useCallback, useRef, useEffect, useState } from "react";

/**
 * Returns smooth mouse-derived rotation values for a 3D scene.
 * Uses requestAnimationFrame with throttled React state updates.
 */
export default function usePointerParallax({ maxRotate = 6, damping = 0.08 } = {}) {
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const isTouchDevice =
    typeof window !== "undefined" && "ontouchstart" in window;

  const [smoothed, setSmoothed] = useState({ rotateX: 0, rotateY: 0 });

  const animate = useCallback(() => {
    const tx = currentRef.current.x;
    const ty = currentRef.current.y;

    currentRef.current.x += (targetRef.current.x - currentRef.current.x) * damping;
    currentRef.current.y += (targetRef.current.y - currentRef.current.y) * damping;

    const rx = -currentRef.current.y * maxRotate;
    const ry = currentRef.current.x * maxRotate;

    setSmoothed((prev) => {
      if (Math.abs(prev.rotateX - rx) > 0.01 || Math.abs(prev.rotateY - ry) > 0.01) {
        return { rotateX: rx, rotateY: ry };
      }
      return prev;
    });

    if (Math.abs(tx - targetRef.current.x) > 0.001 || Math.abs(ty - targetRef.current.y) > 0.001) {
      rafRef.current = requestAnimationFrame(animate);
    } else {
      rafRef.current = null;
    }
  }, [maxRotate, damping]);

  const handlePointer = useCallback(
    (e) => {
      if (isTouchDevice) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      targetRef.current = { x, y };

      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(animate);
      }
    },
    [animate, isTouchDevice],
  );

  const handleLeave = useCallback(() => {
    targetRef.current = { x: 0, y: 0 };
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return {
    rotateX: smoothed.rotateX,
    rotateY: smoothed.rotateY,
    handlers: {
      onPointerMove: handlePointer,
      onPointerLeave: handleLeave,
    },
  };
}
