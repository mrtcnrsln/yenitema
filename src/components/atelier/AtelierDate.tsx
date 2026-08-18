"use client";

import { motion } from "framer-motion";
import { theme, SERIF, SANS, couple } from "@/lib/atelier";

export default function AtelierDate() {
  return (
    <section className="relative h-full w-full flex items-center justify-center overflow-hidden" style={{ backgroundColor: theme.bg }}>
      <div className="text-center">
        {/* Oversized 24 */}
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.06, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="block font-light select-none leading-none"
          style={{
            fontFamily: SERIF,
            color: theme.accent,
            fontSize: "clamp(10rem, 30vw, 25rem)",
          }}
        >
          24
        </motion.span>

        {/* Overlaid month */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-3xl md:text-5xl font-light"
            style={{ fontFamily: SERIF, color: theme.text }}
          >
            AĞUSTOS
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-3xl font-light mt-1"
            style={{ fontFamily: SERIF, color: theme.textMuted }}
          >
            2026
          </motion.span>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="h-px my-5"
            style={{ backgroundColor: theme.accent }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-xs uppercase"
            style={{ fontFamily: SANS, color: theme.textMuted, letterSpacing: "0.3em" }}
          >
            {couple.day} · {couple.time}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
