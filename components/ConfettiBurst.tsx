"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * ConfettiBurst — "Grand Finale"
 * ------------------------------------------------------------------
 * A button that, on click, fires a screen-filling burst of little
 * heart-shaped confetti from the bottom-center of the screen using a
 * full-viewport canvas overlay. Self-contained: no external confetti
 * library required.
 *
 * ✏️ EDIT ME: change the final message below to your own closing line.
 */

interface ConfettiPiece {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  life: number;
}

const CONFETTI_COLORS = ["#E4A0B0", "#D1C2E8", "#F5D6A8", "#C9738A", "#F0BFC9"];

function drawHeart(ctx: CanvasRenderingContext2D, size: number) {
  ctx.beginPath();
  const s = size;
  ctx.moveTo(0, s * 0.3);
  ctx.bezierCurveTo(0, 0, -s / 2, 0, -s / 2, s * 0.3);
  ctx.bezierCurveTo(-s / 2, s * 0.65, 0, s * 0.65, 0, s);
  ctx.bezierCurveTo(0, s * 0.65, s / 2, s * 0.65, s / 2, s * 0.3);
  ctx.bezierCurveTo(s / 2, 0, 0, 0, 0, s * 0.3);
  ctx.closePath();
}

export default function ConfettiBurst() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fired, setFired] = useState(false);

  function launchConfetti() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const pieces: ConfettiPiece[] = Array.from({ length: 150 }, () => {
      const angle = Math.random() * Math.PI - Math.PI; // upward-ish spread
      const speed = Math.random() * 8;
      return {
        x: width / 2 + (Math.random() - 0.5) * 160,
        y: height + 20,
        vx: Math.cos(angle) * speed * 0.7,
        vy: -Math.abs(Math.sin(angle) * speed * 1.3) - 9,
        // UPDATED: Multiplied the original size by 3
        size: (Math.random() * 26 + 24) * 2, 
        color:
          CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.15,
        life: 1,
      };
    });

    // UPDATED: Decreased gravity for a much floatier fall
    const gravity = 0.03; 
    const drag = 0.996;
    let frame = 0;
    // UPDATED: Increased frames for longer hang time (~15s at 60fps)
    const maxFrames = 900; 

    function tick() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      frame++;

      pieces.forEach((p) => {
        p.vx *= drag;
        p.vy = p.vy * drag + gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        
        // Starts fading out later in the animation cycle
        if (frame > maxFrames * 0.75) {
          // UPDATED: Decreased fade out speed to match the longer duration
          p.life -= 0.006; 
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        drawHeart(ctx, p.size);
        ctx.fill();
        ctx.restore();
      });

      if (frame < maxFrames) {
        requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    }

    tick();
  }

  function handleClick() {
    setFired(true);
    launchConfetti();
  }

  return (
    <section className="relative z-20 flex w-full flex-col items-center justify-center px-6 py-28 text-center sm:py-36">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-50 h-full w-full"
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="flex flex-col items-center gap-6"
      >
        <h2 className="font-display text-3xl font-semibold text-rose-600 sm:text-4xl">
          {fired ? "There's really no end to it" : "One more thing…"}
        </h2>

        {/* ✏️ EDIT ME: closing message shown under the button */}
        <p className="max-w-md font-body text-rose-500/90">
          {fired
            ? "This is just today's reminder. There's always more where that came from."
            : "There's a little more love where that came from."}
        </p>

        <motion.button
          onClick={handleClick}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="rounded-full bg-rose-500 px-8 py-3 font-body font-semibold text-cream shadow-[0_10px_25px_rgba(201,115,138,0.4)] transition hover:bg-rose-600"
        >
          {fired ? "again? 🩷" : "tap for one more thing"}
        </motion.button>
      </motion.div>
    </section>
  );
}