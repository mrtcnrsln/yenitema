"use client";

import { motion } from "framer-motion";
import { theme, SERIF, SANS, couple, images } from "@/lib/atelier";

export default function AtelierFinal() {
  return (
    <section className="relative h-full w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={images.final} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(250,250,248,0.88)" }} />
      </div>

      <div className="relative z-10 text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-snug"
          style={{ fontFamily: SERIF, color: theme.text }}
        >
          BUGÜNÜ BİRLİKTE
          <br />
          UNUTULMAZ KILALIM.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-8"
        >
          <p className="text-xl md:text-2xl font-light" style={{ fontFamily: SERIF, color: theme.accent }}>
            {couple.bride} &amp; {couple.groom}
          </p>
          <p className="text-xs mt-3" style={{ fontFamily: SANS, color: theme.textMuted, letterSpacing: "0.2em" }}>
            {couple.dateShort}
          </p>
        </motion.div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="h-px mx-auto mt-8"
          style={{ backgroundColor: theme.accent }}
        />

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-10"
        >
          <p className="text-[9px] uppercase" style={{ fontFamily: SANS, color: theme.textMuted, letterSpacing: "0.3em" }}>
            davetimigor.com
          </p>
        </motion.div>
      </div>
    </section>
  );
}
