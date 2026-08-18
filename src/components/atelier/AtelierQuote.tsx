"use client";

import { motion } from "framer-motion";
import { theme, SERIF, SANS } from "@/lib/atelier";

function WordByWord({ text, delay }: { text: string; delay: number }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: delay + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            {w}
          </motion.span>
          {i < text.split(" ").length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

export default function AtelierQuote() {
  return (
    <section className="relative h-full w-full flex items-center overflow-hidden px-8 md:px-20" style={{ backgroundColor: theme.bg }}>
      {/* Vertical accent line */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: 80 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="absolute left-8 md:left-20 top-1/2 -translate-y-1/2 w-px"
        style={{ backgroundColor: theme.accent, opacity: 0.3 }}
      />

      <div className="max-w-3xl ml-0 md:ml-16">
        <motion.p
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight"
          style={{ fontFamily: SERIF, color: theme.text }}
        >
          <WordByWord text="Bazı anlar vardır," delay={0.3} />
        </motion.p>
        <motion.p
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight mt-1"
          style={{ fontFamily: SERIF, color: theme.text }}
        >
          <WordByWord text="bir ömür boyunca" delay={0.9} />
        </motion.p>
        <motion.p
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight mt-1"
          style={{ fontFamily: SERIF, color: theme.text }}
        >
          <WordByWord text="hatırlanır." delay={1.5} />
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="mt-10 text-sm font-light max-w-lg leading-relaxed"
          style={{ fontFamily: SANS, color: theme.textMuted }}
        >
          Hayatımızın en güzel başlangıçlarından birine adım atarken bu özel günü bizimle paylaşmanızı diliyoruz.
        </motion.p>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 50 }}
          transition={{ duration: 1, delay: 2.8 }}
          className="mt-8 h-px"
          style={{ backgroundColor: theme.accent, opacity: 0.3 }}
        />
      </div>
    </section>
  );
}
