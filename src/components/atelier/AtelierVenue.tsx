"use client";

import { motion } from "framer-motion";
import { theme, SERIF, SANS, images, venue } from "@/lib/atelier";

export default function AtelierVenue() {
  return (
    <section className="relative h-full w-full overflow-hidden">
      <img src={images.venue} alt={venue.name} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(250,250,248,0.1) 0%, rgba(250,250,248,0.85) 100%)" }} />

      <div className="relative z-10 flex flex-col justify-end h-full pb-16 md:pb-24 px-8 md:px-20">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[10px] uppercase mb-3"
          style={{ fontFamily: SANS, color: theme.textMuted, letterSpacing: "0.3em" }}
        >
          DAVETİNİ ALDIĞIN YER
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-4xl md:text-6xl lg:text-7xl font-light"
          style={{ fontFamily: SERIF, color: theme.text }}
        >
          {venue.name}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-sm mt-2"
          style={{ fontFamily: SANS, color: theme.textMuted, letterSpacing: "0.1em" }}
        >
          {venue.location}
        </motion.p>

        <motion.a
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          href={venue.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block text-[10px] uppercase px-8 py-3 border transition-all duration-500 hover:bg-black/5 self-start"
          style={{ fontFamily: SANS, color: theme.accent, borderColor: theme.accent, letterSpacing: "0.25em" }}
          data-cursor-hover
        >
          KONUMU GÖR
        </motion.a>
      </div>
    </section>
  );
}
