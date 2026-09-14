import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useFinePointer, useReducedMotion } from "../hooks/use-app";

type CursorState =
  | { variant: "default" }
  | { variant: "hover" }
  | { variant: "label"; label: string };

/**
 * Cursor personalizado premium:
 * - dot roxo neon no estado normal
 * - círculo expandido com glow sobre botões/links
 * - círculo com texto sobre imagens/CTAs ([data-cursor="VER"...])
 * Desativado em touch e com prefers-reduced-motion.
 */
export default function CustomCursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const enabled = fine && !reduced;

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const x = useSpring(mx, { stiffness: 520, damping: 40, mass: 0.55 });
  const y = useSpring(my, { stiffness: 520, damping: 40, mass: 0.55 });

  const [state, setState] = useState<CursorState>({ variant: "default" });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target || typeof target.closest !== "function") return;

      const labelled = target.closest("[data-cursor]");
      if (labelled) {
        const label = labelled.getAttribute("data-cursor") ?? "";
        setState(label ? { variant: "label", label } : { variant: "hover" });
        return;
      }

      const interactive = target.closest(
        "a, button, [role='button'], select, .cursor-hover",
      );
      if (interactive) {
        setState({ variant: "hover" });
        return;
      }

      setState({ variant: "default" });
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, mx, my]);

  if (!enabled) return null;

  const size =
    state.variant === "label" ? 88 : state.variant === "hover" ? 56 : 14;

  return (
    <motion.div
      aria-hidden="true"
      style={{ x, y }}
      className="pointer-events-none fixed top-0 left-0 z-[999]"
    >
      <motion.div
        animate={{
          width: size,
          height: size,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 420, damping: 32 }}
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
        style={{
          background:
            state.variant === "label"
              ? "rgba(120, 0, 255, 0.92)"
              : state.variant === "hover"
                ? "rgba(120, 0, 255, 0.08)"
                : "#A100FF",
          border:
            state.variant === "hover"
              ? "1px solid rgba(161, 0, 255, 0.7)"
              : state.variant === "label"
                ? "1px solid rgba(255,255,255,0.25)"
                : "none",
          boxShadow:
            state.variant === "default"
              ? "0 0 14px rgba(161,0,255,0.8), 0 0 36px rgba(120,0,255,0.4)"
              : "0 0 30px rgba(120,0,255,0.45), inset 0 0 18px rgba(161,0,255,0.25)",
          backdropFilter: state.variant === "hover" ? "blur(2px)" : undefined,
        }}
      >
        <AnimatePresence mode="wait">
          {state.variant === "label" && (
            <motion.span
              key={state.label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.18 }}
              className="label-mono text-[9px] font-semibold text-white"
            >
              {state.label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
