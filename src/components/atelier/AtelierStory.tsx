"use client";

import { motion } from "framer-motion";
import { theme, SERIF, SANS, storyTimeline, images } from "@/lib/atelier";

export default function AtelierStory() {
  return (
    <section className="relative h-full w-full flex flex-col justify-center overflow-hidden" style={{ backgroundColor: theme.bg }}>
      {/* Title */}
      <div className="px-8 md:px-20 mb-8">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 0.6 }}
          className="text-[10px] uppercase block mb-2"
          style={{ fontFamily: SANS, color: theme.textMuted, letterSpacing: "0.3em" }}
        >
          BİZİM
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl font-light"
          style={{ fontFamily: SERIF, color: theme.text }}
        >
          Hikâyemiz
        </motion.h2>
      </div>

      {/* Horizontal timeline */}
      <div className="relative px-8 md:px-20">
        {/* Line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="h-px absolute top-[44px]"
          style={{ backgroundColor: theme.border }}
        />

        <div className="grid grid-cols-4 gap-4 md:gap-6">
          {storyTimeline.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 + i * 0.12 }}
              className="flex flex-col"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden mb-4 group" data-cursor-hover>
                <img
                  src={images.story[i]}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Overlay on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ backgroundColor: "rgba(250,250,248,0.15)" }}
                />
              </div>

              {/* Year */}
              <span className="text-2xl md:text-3xl font-light" style={{ fontFamily: SERIF, color: theme.accent }}>
                {item.year}
              </span>

              {/* Title */}
              <h3 className="text-sm md:text-base font-light mt-1" style={{ fontFamily: SERIF, color: theme.text }}>
                {item.title}
              </h3>
              <p className="text-xs font-light mt-0.5" style={{ fontFamily: SANS, color: theme.textMuted }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
