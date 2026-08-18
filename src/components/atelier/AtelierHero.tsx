"use client";

import { motion } from "framer-motion";
import { theme, SERIF, SANS, couple, images } from "@/lib/atelier";

function CharReveal({ text, delay }: { text: string; delay: number }) {
  return (
    <span className="inline-block overflow-hidden">
      {text.split("").map((c, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: delay + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            {c}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function AtelierHero() {
  return (
    <section className="relative h-full w-full flex items-center justify-center overflow-hidden" style={{ backgroundColor: theme.bg }}>
      {/* Subtle background image */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.08 }}
        transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <img src={images.hero} alt="" className="w-full h-full object-cover" />
      </motion.div>

      <div className="relative z-10 text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0.4, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[10px] uppercase mb-6"
          style={{ fontFamily: SANS, color: theme.textMuted, letterSpacing: "0.3em" }}
        >
          BİRLİKTE YAZACAĞIMIZ YENİ HİKÂYENİN İLK SAYFASI
        </motion.p>

        <h1 className="font-light leading-none" style={{ fontFamily: SERIF, color: theme.text }}>
          <span className="block text-7xl sm:text-8xl md:text-[11rem] lg:text-[13rem]">
            <CharReveal text={couple.bride.toUpperCase()} delay={0.4} />
          </span>
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="block text-3xl sm:text-4xl md:text-5xl font-light my-2"
            style={{ color: theme.accent }}
          >
            &amp;
          </motion.span>
          <span className="block text-7xl sm:text-8xl md:text-[11rem] lg:text-[13rem]">
            <CharReveal text={couple.groom.toUpperCase()} delay={1.4} />
          </span>
        </h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 40 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="h-px mx-auto mt-8"
          style={{ backgroundColor: theme.accent }}
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ duration: 0.8, delay: 2.8 }}
          className="mt-6 text-xs uppercase"
          style={{ fontFamily: SANS, color: theme.textMuted, letterSpacing: "0.25em" }}
        >
          {couple.date} · {couple.time}
        </motion.p>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 0.8, delay: 3.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={theme.textMuted} strokeWidth="1">
              <path d="M3 5l4 4 4-4" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
