"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FloatingDecor from "./FloatingDecor";

/**
 * HeroSection
 * ------------------------------------------------------------------
 * Signature moment of the page: a pulsating envelope with a wax seal.
 * Tapping it "cracks" the seal and unfolds the envelope flap before
 * the headline gently springs into view. This replaces a generic
 * fade/scale reveal with something that feels like actually opening
 * a physical letter.
 *
 * ✏️ EDIT ME: change the headline / subline text below to whatever
 * you'd like it to say.
 */

const springTransition = { type: "spring" as const, stiffness: 100, damping: 20 };

interface HeroSectionProps {
  /** Called once, right when the envelope is tapped open — a good moment
   *  to start background music, since it's a genuine user gesture. */
  onOpen?: () => void;
}

export default function HeroSection({ onOpen }: HeroSectionProps) {
  const [stage, setStage] = useState<"closed" | "opening" | "revealed">(
    "closed"
  );

  function handleOpen() {
    if (stage !== "closed") return;
    setStage("opening");
    onOpen?.();
    // hold on the "opening" animation briefly before showing the headline
    setTimeout(() => setStage("revealed"), 950);
  }

  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      <FloatingDecor />

      <AnimatePresence mode="wait">
        {stage !== "revealed" ? (
          <motion.div
            key="envelope"
            className="relative z-20 flex flex-col items-center gap-6"
            exit={{ opacity: 0, scale: 0.85, y: -20 }}
            transition={springTransition}
          >
            <button
              onClick={handleOpen}
              aria-label="Tap to open your letter"
              className="group relative flex h-40 w-56 items-center justify-center sm:h-48 sm:w-64"
            >
              {/* Envelope body */}
              <motion.svg
                viewBox="0 0 200 140"
                className="absolute inset-0 h-full w-full drop-shadow-[0_10px_25px_rgba(201,115,138,0.35)]"
                animate={
                  stage === "closed"
                    ? { y: [0, -6, 0] }
                    : { rotateX: 0 }
                }
                transition={
                  stage === "closed"
                    ? { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
                    : springTransition
                }
              >
                <rect
                  x="4"
                  y="14"
                  width="192"
                  height="122"
                  rx="10"
                  fill="#FFF6F6"
                  stroke="#F0BFC9"
                  strokeWidth="2"
                />
                {/* bottom triangle fold, always visible */}
                <path
                  d="M4 24 L100 100 L196 24 L196 128 Q196 134 190 134 L10 134 Q4 134 4 128 Z"
                  fill="#FCEBEE"
                  stroke="#F0BFC9"
                  strokeWidth="1.5"
                />
              </motion.svg>

              {/* Top flap — unfolds open like a real envelope */}
              <motion.svg
                viewBox="0 0 200 140"
                className="absolute inset-0 h-full w-full"
                style={{ transformOrigin: "100px 24px" }}
                animate={
                  stage === "opening"
                    ? { rotateX: 180, transition: springTransition }
                    : { rotateX: 0 }
                }
              >
                <path
                  d="M4 24 Q4 14 14 14 L186 14 Q196 14 196 24 L100 92 Z"
                  fill="#F7D9DF"
                  stroke="#E4A0B0"
                  strokeWidth="2"
                />
              </motion.svg>

              {/* Wax seal — cracks and fades away on open */}
              <motion.div
                className="absolute z-10 flex h-12 w-12 items-center justify-center rounded-full bg-rose-500 text-cream shadow-lg animate-glowPulse sm:h-14 sm:w-14"
                animate={
                  stage === "opening"
                    ? { scale: 0.4, rotate: 25, opacity: 0 }
                    : { scale: 1, rotate: 0, opacity: 1 }
                }
                transition={springTransition}
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-cream">
                  <path d="M12 21s-7.5-4.6-10-9.3C.4 8.1 2 4.5 5.4 4C7.7 3.6 9.9 4.7 12 7c2.1-2.3 4.3-3.4 6.6-3C22 4.5 23.6 8.1 22 11.7 19.5 16.4 12 21 12 21z" />
                </svg>
              </motion.div>
            </button>

            <motion.p
              className="font-body text-sm uppercase tracking-[0.3em] text-rose-500/80"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.4, repeat: Infinity }}
            >
              tap to open
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="headline"
            className="relative z-20 flex flex-col items-center px-6 text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springTransition, delay: 0.1 }}
          >
            {/* ✏️ EDIT ME: main headline text */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTransition, delay: 0.25 }}
              className="font-display text-5xl font-semibold leading-tight text-rose-600 sm:text-7xl"
            >
              Happy Girlfriend&rsquo;s Day
            </motion.h1>

            {/* ✏️ EDIT ME: subline / her name */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTransition, delay: 0.45 }}
              className="mt-4 font-script text-3xl text-rose-500 sm:text-4xl"
            >
              to the softest, warmest heart I know
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="mt-10 flex flex-col items-center gap-2 text-rose-400"
            >
              <span className="text-xs uppercase tracking-[0.35em]">
                scroll down
              </span>
              <motion.span
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="text-xl"
              >
                ↓
              </motion.span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
