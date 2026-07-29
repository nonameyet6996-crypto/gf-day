"use client";

import { motion } from "framer-motion";

/**
 * FloatingDecor
 * ------------------------------------------------------------------
 * A handful of small SVG stars and hearts, positioned absolutely and
 * scattered around a section, that bob up and down forever. These sit
 * outside the normal document flow (position: absolute) so they don't
 * affect layout, and use Framer Motion's `repeat: Infinity` for the
 * gentle bobbing motion described in the brief.
 *
 * Usage: drop <FloatingDecor /> inside any `relative` positioned
 * section wrapper.
 */

const STAR_PATH =
  "M12 2l2.6 6.2L21 9.3l-5 4.3 1.5 6.8L12 16.9 6.5 20.4 8 13.6 3 9.3l6.4-1.1L12 2z";

interface DecorItem {
  id: number;
  type: "star" | "heart";
  top: string;
  left: string;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

const items: DecorItem[] = [
  { id: 1, type: "star", top: "8%", left: "6%", size: 20, color: "#F5D6A8", duration: 6, delay: 0 },
  { id: 2, type: "heart", top: "18%", left: "88%", size: 22, color: "#E4A0B0", duration: 7, delay: 0.4 },
  { id: 3, type: "star", top: "72%", left: "10%", size: 16, color: "#D1C2E8", duration: 5.5, delay: 0.8 },
  { id: 4, type: "heart", top: "80%", left: "80%", size: 18, color: "#F0BFC9", duration: 6.5, delay: 1.1 },
  { id: 5, type: "star", top: "40%", left: "94%", size: 14, color: "#F5D6A8", duration: 7.5, delay: 0.2 },
];

export default function FloatingDecor() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 overflow-visible"
    >
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute"
          style={{ top: item.top, left: item.left }}
          animate={{ y: [0, -16, 0], rotate: [0, 6, 0] }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {item.type === "star" ? (
            <svg
              width={item.size}
              height={item.size}
              viewBox="0 0 24 24"
              fill={item.color}
              className="drop-shadow-sm opacity-80"
            >
              <path d={STAR_PATH} />
            </svg>
          ) : (
            <svg
              width={item.size}
              height={item.size}
              viewBox="0 0 32 29"
              className="drop-shadow-sm opacity-80"
            >
              <path
                fill={item.color}
                d="M23.6 0c-3 0-5.7 1.6-7.6 4.2C14.1 1.6 11.4 0 8.4 0 3.8 0 0 3.7 0 8.4c0 8 10.6 13.6 16 18.6 5.4-5 16-10.6 16-18.6C32 3.7 28.2 0 23.6 0z"
              />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
}
