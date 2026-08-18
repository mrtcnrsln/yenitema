"use client";

import { motion } from "framer-motion";
import { theme, SERIF, SANS, images } from "@/lib/atelier";

export default function AtelierMemories() {
  return (
    <section className="relative h-full w-full flex flex-col justify-center overflow-hidden px-6 md:px-12" style={{ backgroundColor: theme.bg }}>
      <div className="text-center mb-6 md:mb-8">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 30 }}
          transition={{ duration: 0.8 }}
          className="h-px mx-auto mb-5"
          style={{ backgroundColor: theme.accent, opacity: 0.3 }}
        />
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          className="text-[10px] uppercase block mb-2"
          style={{ fontFamily: SANS, color: theme.textMuted, letterSpacing: "0.3em" }}
        >
          BİRLİKTE GEÇEN GÜNLERDEN
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl md:text-5xl font-light"
          style={{ fontFamily: SERIF, color: theme.text }}
        >
          Anılarımız
        </motion.h2>
      </div>

      {/* Gallery grid */}
      <div className="max-w-5xl mx-auto w-full grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.memories.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
            className="relative aspect-[4/3] overflow-hidden group"
            data-cursor-hover
          >
            <img
              src={src}
              alt={`Anı ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center" style={{ backgroundColor: "rgba(250,250,248,0.2)" }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={theme.accent} strokeWidth="0.8">
                <path d="M14 2h4v4M14 2l6 6M18 14v4h-4M2 6h4v-4M6 18H2v-4M2 6l6 6" />
              </svg>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
