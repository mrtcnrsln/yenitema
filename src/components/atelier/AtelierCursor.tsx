"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { theme } from "@/lib/atelier";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function AtelierCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springCfg = { damping: 25, stiffness: 200, mass: 0.5 };
  const x = useSpring(cursorX, springCfg);
  const y = useSpring(cursorY, springCfg);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const addRipple = useCallback((e: MouseEvent) => {
    const id = Date.now();
    setRipples(prev => [...prev, { id, x: e.clientX, y: e.clientY }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 1000);
  }, []);

  useEffect(() => {
    if ("ontouchstart" in window) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const over = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button, [data-cursor-hover]")) setHovering(true);
    };
    const out = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button, [data-cursor-hover]")) setHovering(false);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("click", addRipple);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("click", addRipple);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
    };
  }, [cursorX, cursorY, visible, addRipple]);

  if (!visible) return null;

  return (
    <>
      {/* Ripples */}
      {ripples.map(r => (
        <motion.div
          key={r.id}
          initial={{ opacity: 0.4, scale: 0 }}
          animate={{ opacity: 0, scale: 3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="fixed pointer-events-none z-[9999] rounded-full"
          style={{
            left: r.x,
            top: r.y,
            width: 40,
            height: 40,
            marginLeft: -20,
            marginTop: -20,
            border: `1px solid ${theme.accent}`,
          }}
        />
      ))}

      {/* Cursor dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          width: hovering ? 50 : 8,
          height: hovering ? 50 : 8,
          border: hovering ? `1px solid ${theme.accent}` : "none",
          backgroundColor: hovering ? "transparent" : theme.accent,
          transition: "width 0.3s, height 0.3s, background-color 0.3s, border 0.3s",
          opacity: hovering ? 0.5 : 0.8,
        }}
      />
    </>
  );
}
