"use client";

import { motion } from "framer-motion";
import type React from "react";
import { theme, SERIF, SANS, events } from "@/lib/atelier";

const icons: Record<string, React.ReactNode> = {
  rings: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={theme.accent} strokeWidth="0.8">
      <circle cx="8" cy="11" r="5" /><circle cx="12" cy="11" r="5" />
    </svg>
  ),
  plate: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={theme.accent} strokeWidth="0.8">
      <circle cx="10" cy="10" r="7" /><circle cx="10" cy="10" r="3" />
    </svg>
  ),
  dance: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={theme.accent} strokeWidth="0.8">
      <circle cx="10" cy="5" r="2" /><path d="M10 7v5l-3 5M10 12l3 5" />
    </svg>
  ),
  music: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={theme.accent} strokeWidth="0.8">
      <path d="M7 17V5l8-3v12" /><circle cx="5" cy="17" r="2" /><circle cx="13" cy="14" r="2" />
    </svg>
  ),
};

export default function AtelierEvents() {
  return (
    <section className="relative h-full w-full flex flex-col justify-center overflow-hidden px-8 md:px-20" style={{ backgroundColor: theme.bgAlt }}>
      <div className="max-w-4xl mx-auto w-full">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          className="text-[10px] uppercase block mb-2"
          style={{ fontFamily: SANS, color: theme.textMuted, letterSpacing: "0.3em" }}
        >
          AKŞAMIN AKIŞI
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl md:text-5xl font-light mb-12"
          style={{ fontFamily: SERIF, color: theme.text }}
        >
          Program
        </motion.h2>

        <div className="space-y-8">
          {events.map((ev, i) => (
            <motion.div
              key={ev.time}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-6 md:gap-10"
            >
              {/* Icon */}
              <div className="w-8 shrink-0">{icons[ev.icon]}</div>

              {/* Time */}
              <span className="text-xl md:text-3xl font-light w-20 shrink-0 text-right" style={{ fontFamily: SERIF, color: theme.accent }}>
                {ev.time}
              </span>

              {/* Line */}
              <div className="hidden md:block flex-1 h-px" style={{ backgroundColor: theme.border }} />

              {/* Label */}
              <span className="text-xs uppercase tracking-widest" style={{ fontFamily: SANS, color: theme.text, letterSpacing: "0.2em" }}>
                {ev.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
