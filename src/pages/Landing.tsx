import { useState } from "react";
import { motion } from "framer-motion";

// Entry
import AtelierEntry from "@/components/atelier/AtelierEntry";

// Panels
import AtelierPanel from "@/components/atelier/AtelierPanel";
import AtelierHero from "@/components/atelier/AtelierHero";
import AtelierQuote from "@/components/atelier/AtelierQuote";
import AtelierStory from "@/components/atelier/AtelierStory";
import AtelierDate from "@/components/atelier/AtelierDate";
import AtelierEvents from "@/components/atelier/AtelierEvents";
import AtelierVenue from "@/components/atelier/AtelierVenue";
import AtelierCountdown from "@/components/atelier/AtelierCountdown";
import AtelierMemories from "@/components/atelier/AtelierMemories";
import AtelierRSVP from "@/components/atelier/AtelierRSVP";
import AtelierGuestMessage from "@/components/atelier/AtelierGuestMessage";
import AtelierFinal from "@/components/atelier/AtelierFinal";

// Effects
import AtelierCursor from "@/components/atelier/AtelierCursor";

const panels = [
  { id: "Giriş" },
  { id: "Sözler" },
  { id: "Hikâye" },
  { id: "Tarih" },
  { id: "Program" },
  { id: "Mekân" },
  { id: "Geri Sayım" },
  { id: "Anılar" },
  { id: "LCV" },
  { id: "Mesaj" },
  { id: "Kapanış" },
];

const transitions: Array<"fade" | "slide-up" | "slide-left" | "scale" | "wipe"> = [
  "fade",
  "slide-up",
  "slide-left",
  "scale",
  "wipe",
  "fade",
  "slide-up",
  "slide-left",
  "scale",
  "fade",
  "slide-up",
];

export default function Landing() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="h-screen overflow-hidden" style={{ backgroundColor: "#FAFAF8", color: "#1C1917" }}>
      <AtelierCursor />

      {!opened && <AtelierEntry onOpen={() => setOpened(true)} />}

      {opened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <AtelierPanel panels={panels} transitions={transitions}>
            {[
              <div key="hero" className="h-screen w-screen"><AtelierHero /></div>,
              <div key="quote" className="h-screen w-screen"><AtelierQuote /></div>,
              <div key="story" className="h-screen w-screen"><AtelierStory /></div>,
              <div key="date" className="h-screen w-screen"><AtelierDate /></div>,
              <div key="events" className="h-screen w-screen"><AtelierEvents /></div>,
              <div key="venue" className="h-screen w-screen"><AtelierVenue /></div>,
              <div key="countdown" className="h-screen w-screen"><AtelierCountdown /></div>,
              <div key="memories" className="h-screen w-screen"><AtelierMemories /></div>,
              <div key="rsvp" className="h-screen w-screen"><AtelierRSVP /></div>,
              <div key="guest" className="h-screen w-screen"><AtelierGuestMessage /></div>,
              <div key="final" className="h-screen w-screen"><AtelierFinal /></div>,
            ]}
          </AtelierPanel>
        </motion.div>
      )}
    </div>
  );
}
