"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { theme, SERIF, SANS, WEDDING_DATE } from "@/lib/atelier";

function getTime() {
  const diff = WEDDING_DATE.getTime() - Date.now();
  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff / 3600000) % 24),
    m: Math.floor((diff / 60000) % 60),
    s: Math.floor((diff / 1000) % 60),
  };
}

function Unit({ val, label, delay }: { val: number; label: string; delay: number }) {
  const fmt = String(val).padStart(2, "0");
  const [prev, setPrev] = useState(fmt);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (fmt !== prev) {
      setFlip(true);
      const t = setTimeout(() => { setPrev(fmt); setFlip(false); }, 250);
      return () => clearTimeout(t);
    }
  }, [fmt, prev]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col items-center"
    >
      <div className="relative h-[45px] sm:h-[55px] md:h-[70px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={fmt}
            initial={flip ? { y: -15, opacity: 0 } : false}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 15, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 flex items-center justify-center text-4xl sm:text-5xl md:text-6xl font-light tabular-nums"
            style={{ fontFamily: SERIF, color: theme.text }}
          >
            {fmt}
          </motion.span>
        </AnimatePresence>
      </div>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.6, delay: delay + 0.15 }}
        className="h-px my-2"
        style={{ backgroundColor: theme.border }}
      />
      <span className="text-[9px] uppercase" style={{ fontFamily: SANS, color: theme.textMuted, letterSpacing: "0.25em" }}>
        {label}
      </span>
    </motion.div>
  );
}

export default function AtelierCountdown() {
  const [time, setTime] = useState(getTime);
  useEffect(() => {
    const i = setInterval(() => setTime(getTime()), 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <section className="relative h-full w-full flex flex-col items-center justify-center overflow-hidden px-6" style={{ backgroundColor: theme.bg }}>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        className="text-[10px] uppercase mb-4"
        style={{ fontFamily: SANS, color: theme.textMuted, letterSpacing: "0.3em" }}
      >
        BULUŞMAMIZA KALAN
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-3xl md:text-5xl font-light mb-10"
        style={{ fontFamily: SERIF, color: theme.text }}
      >
        Geri Sayım
      </motion.h2>

      <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-lg w-full">
        <Unit val={time.d} label="Gün" delay={0.2} />
        <Unit val={time.h} label="Saat" delay={0.3} />
        <Unit val={time.m} label="Dakika" delay={0.4} />
        <Unit val={time.s} label="Saniye" delay={0.5} />
      </div>
    </section>
  );
}
