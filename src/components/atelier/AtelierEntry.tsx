"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { SERIF, SANS, theme, couple } from "@/lib/atelier";

/**
 * ATELIER OPENING — "The Line Splits"
 *
 * 1. White screen
 * 2. A thin horizontal line draws across the center
 * 3. The line "splits" apart — top half goes up, bottom goes down
 * 4. From the split, the couple's names emerge
 * 5. A subtle golden shimmer runs along the line
 * 6. CTA button fades in
 */
export default function AtelierEntry({ onOpen }: { onOpen: () => void }) {
  const [phase, setPhase] = useState<"line" | "split" | "reveal" | "done">("line");
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("split"), 1800);
    const t2 = setTimeout(() => setPhase("reveal"), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleOpen = useCallback(() => {
    setDismissed(true);
    setTimeout(() => onOpen(), 1000);
  }, [onOpen]);

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          key="atelier-entry"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center cursor-pointer"
          style={{ backgroundColor: theme.bg }}
          onClick={handleOpen}
        >
          {/* ── Horizontal Line ── */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: phase === "line" ? "60vw" : "60vw" }}
            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
            className="absolute h-px"
            style={{ backgroundColor: theme.accent, opacity: 0.4 }}
          />

          {/* ── Golden shimmer on line ── */}
          <motion.div
            initial={{ left: "-10%" }}
            animate={{ left: "110%" }}
            transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
            className="absolute h-px w-32"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(196,162,101,0.8), transparent)",
            }}
          />

          {/* ── Split Content ── */}
          <div className="relative flex flex-col items-center gap-1">
            {/* Top half — Bride */}
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{
                opacity: phase !== "line" ? 1 : 0,
                y: phase === "split" || phase === "reveal" ? -20 : 0,
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <motion.p
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 2, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl sm:text-6xl md:text-8xl font-light tracking-tight"
                style={{ fontFamily: SERIF, color: theme.text }}
              >
                {couple.bride}
              </motion.p>
            </motion.div>

            {/* Center divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "reveal" ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 2.5 }}
              className="my-1"
            >
              <span
                className="text-lg font-light"
                style={{ fontFamily: SERIF, color: theme.accent }}
              >
                &amp;
              </span>
            </motion.div>

            {/* Bottom half — Groom */}
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{
                opacity: phase !== "line" ? 1 : 0,
                y: phase === "split" || phase === "reveal" ? 20 : 0,
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <motion.p
                initial={{ y: "-100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl sm:text-6xl md:text-8xl font-light tracking-tight"
                style={{ fontFamily: SERIF, color: theme.text }}
              >
                {couple.groom}
              </motion.p>
            </motion.div>
          </div>

          {/* ── Date ── */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: phase === "reveal" ? 0.5 : 0, y: phase === "reveal" ? 0 : 10 }}
            transition={{ duration: 0.8, delay: 2.8 }}
            className="mt-8 text-xs uppercase"
            style={{ fontFamily: SANS, color: theme.textMuted, letterSpacing: "0.3em" }}
          >
            {couple.dateShort}
          </motion.p>

          {/* ── CTA ── */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: phase === "reveal" ? 1 : 0, y: phase === "reveal" ? 0 : 10 }}
            transition={{ duration: 0.8, delay: 3.5 }}
            onClick={(e) => { e.stopPropagation(); handleOpen(); }}
            className="mt-10 text-xs uppercase px-8 py-3 border transition-all duration-500 hover:bg-black/5"
            style={{
              fontFamily: SANS,
              color: theme.accent,
              borderColor: theme.accent,
              letterSpacing: "0.25em",
            }}
          >
            DAVETİYEMİZİ KEŞFEDİN
          </motion.button>

          {/* ── Corner decorations ── */}
          {[
            "top-8 left-8",
            "top-8 right-8 rotate-90",
            "bottom-8 right-8 rotate-180",
            "bottom-8 left-8 -rotate-90",
          ].map((pos, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "reveal" ? 0.15 : 0 }}
              transition={{ duration: 1, delay: 3 + i * 0.1 }}
              className={`absolute ${pos}`}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M0 24V0h24" stroke={theme.accent} strokeWidth="0.5" />
              </svg>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
