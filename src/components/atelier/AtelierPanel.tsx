"use client";

import { useState, useCallback, useEffect, useRef, type ReactNode } from "react";
import { motion, AnimatePresence, type TargetAndTransition } from "framer-motion";
import { theme, SANS, SERIF } from "@/lib/atelier";

interface Panel {
  id: string;
}

type TransitionKind = "fade" | "slide-up" | "slide-left" | "scale" | "wipe";

function getVariants(kind: TransitionKind, dir: number): {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  exit: TargetAndTransition;
} {
  switch (kind) {
    case "slide-up":
      return {
        initial: { opacity: 0, y: dir * 60 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: dir * -60 },
      };
    case "slide-left":
      return {
        initial: { opacity: 0, x: dir * 80 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: dir * -80 },
      };
    case "scale":
      return {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 1.05 },
      };
    case "wipe":
      return {
        initial: { clipPath: "inset(0 0 100% 0)" },
        animate: { clipPath: "inset(0 0 0% 0)" },
        exit: { clipPath: "inset(100% 0 0 0)" },
      };
    case "fade":
    default:
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      };
  }
}

interface AtelierPanelProps {
  panels: Panel[];
  transitions: TransitionKind[];
  children: ReactNode[];
  onPanelChange?: (i: number) => void;
}

export default function AtelierPanel({
  panels,
  transitions,
  children,
  onPanelChange,
}: AtelierPanelProps) {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const [busy, setBusy] = useState(false);
  const touchY = useRef(0);
  const lastWheel = useRef(0);

  const total = panels.length;

  const goTo = useCallback(
    (i: number) => {
      if (busy || i === current || i < 0 || i >= total) return;
      setDir(i > current ? 1 : -1);
      setBusy(true);
      setCurrent(i);
      onPanelChange?.(i);
      setTimeout(() => setBusy(false), 800);
    },
    [current, total, busy, onPanelChange],
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "ArrowRight", " "].includes(e.key)) { e.preventDefault(); next(); }
      if (["ArrowUp", "ArrowLeft"].includes(e.key)) { e.preventDefault(); prev(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheel.current < 800) return;
      lastWheel.current = now;
      if (e.deltaY > 20) next();
      else if (e.deltaY < -20) prev();
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [next, prev]);

  useEffect(() => {
    const onStart = (e: TouchEvent) => { touchY.current = e.touches[0].clientY; };
    const onEnd = (e: TouchEvent) => {
      const diff = touchY.current - e.changedTouches[0].clientY;
      if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); }
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [next, prev]);

  const kind = transitions[current] || "fade";
  const v = getVariants(kind, dir);

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ backgroundColor: theme.bg }}>
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={current}
          custom={dir}
          initial={v.initial}
          animate={v.animate}
          exit={v.exit}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          {children[current]}
        </motion.div>
      </AnimatePresence>

      {/* ── Side dots ── */}
      <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-[9994] flex flex-col gap-4">
        {panels.map((p, i) => (
          <button
            key={p.id}
            onClick={() => goTo(i)}
            className="group relative flex items-center justify-end"
            data-cursor-hover
          >
            <span
              className="absolute right-5 whitespace-nowrap text-[9px] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ fontFamily: SANS, color: i === current ? theme.accent : theme.textMuted, letterSpacing: "0.15em" }}
            >
              {p.id}
            </span>
            <motion.div
              animate={{
                width: i === current ? 20 : 6,
                backgroundColor: i === current ? theme.accent : theme.border,
              }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="rounded-full"
              style={{ height: 2 }}
            />
          </button>
        ))}
      </div>

      {/* ── Counter ── */}
      <div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9994] flex items-center gap-2"
      >
        <span className="text-sm" style={{ fontFamily: SERIF, color: theme.accent }}>
          {String(current + 1).padStart(2, "0")}
        </span>
        <span className="text-xs" style={{ color: theme.border }}>/</span>
        <span className="text-sm" style={{ fontFamily: SERIF, color: theme.textMuted }}>
          {String(total).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
