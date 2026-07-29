"use client";

import { motion } from "framer-motion";
import FloatingDecor from "./FloatingDecor";

/**
 * LoveLetterSection — "The Cozy Love Letter"
 * ------------------------------------------------------------------
 * A frosted-glass card that lets the particle background stay visible
 * behind it. Each line of the letter fades/slides in individually as
 * it scrolls into view, mimicking handwriting appearing line by line.
 *
 * ✏️ EDIT ME: replace the `letterLines` array with your own words.
 * Keep each entry to roughly one line/thought so the stagger reveal
 * reads naturally.
 */

const letterLines: string[] = [
  "Sometimes I look at you and I am just completely overwhelmed by how much I love you.",
  "It is the kind of love that makes every single day feel heavy with importance, like I want to pause time just so I can stay in this exact moment with you a little bit longer.",
  "You have given me the kind of happiness that I never even thought I deserved, and I cherish you so much.",
  "A promise I need from you:",
  "Mai chutiya hu and I make a lot of mistakes, so when I do make a mistake beat me up, scold me, but please don't stop talking to me.",
  "And my promise to you is:",
  "I will love you with everything I have, every single day. I will make sure we laugh as loud as we can, love as hard as we can, and make every single moment we share count.",
  "You are the most beautiful chapter of my life, and I am going to make sure every page we write together is filled with nothing but pure love.",
  
];

const lineVariant = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 20 },
  },
};

export default function LoveLetterSection() {
  return (
    <section className="relative z-20 flex w-full items-center justify-center px-6 py-28 sm:py-36">
      <FloatingDecor />

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ type: "spring", stiffness: 90, damping: 20 }}
        className="relative z-20 w-full max-w-2xl rounded-3xl border border-white/40 bg-white/30 p-8 shadow-[0_20px_60px_rgba(201,115,138,0.2)] backdrop-blur-xl sm:p-12"
      >
        <p className="mb-6 text-center font-body text-xs uppercase tracking-[0.4em] text-rose-500/80">
          thoda yap
        </p>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.35 }}
          className="space-y-3 font-script text-2xl leading-relaxed text-rose-700 sm:text-3xl"
        >
          {letterLines.map((line, i) => (
            <motion.p key={i} variants={lineVariant}>
              {line}
            </motion.p>
          ))}
        </motion.div>

        {/* ✏️ EDIT ME: sign-off name */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, type: "spring", stiffness: 100, damping: 20 }}
          className="mt-8 text-right font-script text-2xl text-rose-600 sm:text-3xl"
        >
          — naam toh suna hi hoga
        </motion.p>
      </motion.div>
    </section>
  );
}
