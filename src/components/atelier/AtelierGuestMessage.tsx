"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { theme, SERIF, SANS } from "@/lib/atelier";

const inputBase = {
  backgroundColor: "transparent",
  borderBottom: `1px solid ${theme.border}`,
  color: theme.text,
  fontFamily: SANS,
  outline: "none",
  width: "100%",
  padding: "8px 0",
  fontSize: "14px",
  transition: "border-color 0.3s",
};

export default function AtelierGuestMessage() {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const submit = useMutation(api.guestMessages.submit);
  const messages = useQuery(api.guestMessages.list);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      await submit({ name: fd.get("name") as string, message: fd.get("message") as string });
      setDone(true);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  return (
    <section className="relative h-full w-full flex items-center justify-center overflow-hidden px-6" style={{ backgroundColor: theme.bg }}>
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} className="text-[10px] uppercase block mb-2" style={{ fontFamily: SANS, color: theme.textMuted, letterSpacing: "0.3em" }}>
            MESAJINIZ
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="text-3xl md:text-5xl font-light" style={{ fontFamily: SERIF, color: theme.text }}>
            Bir Not Bırakın
          </motion.h2>
        </div>

        <AnimatePresence mode="wait">
          {done ? (
            <motion.div key="ok" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
              <p className="text-xl font-light" style={{ fontFamily: SERIF, color: theme.accent }}>Teşekkürler.</p>
              <button onClick={() => setDone(false)} className="mt-4 text-[10px] uppercase" style={{ fontFamily: SANS, color: theme.textMuted, letterSpacing: "0.2em" }}>Yeni Mesaj</button>
            </motion.div>
          ) : (
            <motion.form key="form" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onSubmit={onSubmit} className="space-y-5">
              <p className="text-sm font-light text-center italic" style={{ fontFamily: SERIF, color: theme.textMuted, opacity: 0.6 }}>
                Dilekleriniz ve güzel sözleriniz...
              </p>
              <input name="name" required placeholder="Adınız" style={inputBase} onFocus={e => e.currentTarget.style.borderColor = theme.accent} onBlur={e => e.currentTarget.style.borderColor = theme.border} />
              <textarea name="message" required rows={3} placeholder="Mesajınız..." style={{ ...inputBase, resize: "none" as const }} onFocus={e => e.currentTarget.style.borderColor = theme.accent} onBlur={e => e.currentTarget.style.borderColor = theme.border} />
              <div className="text-center">
                <button type="submit" disabled={loading} className="px-8 py-3 text-[10px] uppercase border transition-colors hover:bg-black/5 disabled:opacity-50" style={{ fontFamily: SANS, color: theme.accent, borderColor: theme.accent, letterSpacing: "0.2em" }}>
                  {loading ? "..." : "Gönder"}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {messages && messages.length > 0 && (
          <div className="mt-8 pt-6 space-y-4" style={{ borderTop: `1px solid ${theme.border}` }}>
            {messages.slice(0, 3).map(m => (
              <div key={m._id} className="text-center">
                <p className="text-sm font-light italic" style={{ fontFamily: SERIF, color: theme.text }}>"{m.message}"</p>
                <p className="text-[10px] mt-1" style={{ fontFamily: SANS, color: theme.accent, letterSpacing: "0.1em" }}>— {m.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
