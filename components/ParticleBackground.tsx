"use client";

import { useEffect, useRef } from "react";

/**
 * ParticleBackground
 * ------------------------------------------------------------------
 * A lightweight canvas animation — no external particle library —
 * that renders three kinds of ambient particles drifting slowly
 * upward/sideways across the screen:
 *   1. Fireflies  — soft glowing dots that pulse in brightness
 *   2. Hearts     — tiny hearts that fade in, drift, then fade out
 *   3. Stardust   — faint twinkling specks for extra depth
 *
 * Motion is intentionally slow and organic (never fast/jittery) to
 * keep the "lowkey, cozy" feeling the brief asks for.
 */

type ParticleKind = "firefly" | "heart" | "dust";

interface Particle {
  kind: ParticleKind;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  opacityDirection: number;
  maxOpacity: number;
  hue: string;
  sway: number;
  swaySpeed: number;
  swayOffset: number;
}

const FIREFLY_COLORS = ["#F5D6A8", "#F0BFC9", "#EEC17E"];
const HEART_COLORS = ["#E4A0B0", "#D1C2E8", "#F0BFC9"];
const DUST_COLORS = ["#FFFBF5", "#F3EEFB"];

function drawHeart(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number
) {
  ctx.beginPath();
  const topCurveHeight = size * 0.3;
  ctx.moveTo(x, y + topCurveHeight);
  ctx.bezierCurveTo(
    x,
    y,
    x - size / 2,
    y,
    x - size / 2,
    y + topCurveHeight
  );
  ctx.bezierCurveTo(
    x - size / 2,
    y + (size + topCurveHeight) / 2,
    x,
    y + (size + topCurveHeight) / 2,
    x,
    y + size
  );
  ctx.bezierCurveTo(
    x,
    y + (size + topCurveHeight) / 2,
    x + size / 2,
    y + (size + topCurveHeight) / 2,
    x + size / 2,
    y + topCurveHeight
  );
  ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
  ctx.closePath();
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let particles: Particle[] = [];
    let animationId: number;

    // UPDATED: Increased the maximum particle limit from 70 to 150, 
    // and lowered the divisor so the screen fills up with more particles.
    const PARTICLE_COUNT = prefersReducedMotion
      ? 0
      : Math.min(150, Math.floor((width * height) / 10000));

    function randomBetween(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    function makeParticle(): Particle {
      const roll = Math.random();
      const kind: ParticleKind =
        roll < 0.45 ? "firefly" : roll < 0.7 ? "heart" : "dust";

      const palette =
        kind === "firefly"
          ? FIREFLY_COLORS
          : kind === "heart"
          ? HEART_COLORS
          : DUST_COLORS;

      return {
        kind,
        x: randomBetween(0, width),
        y: randomBetween(0, height),
        size:
          kind === "heart"
            ? randomBetween(6, 14)
            : kind === "firefly"
            ? randomBetween(2, 4)
            : randomBetween(1, 2.5),
        speedX: randomBetween(-0.15, 0.15),
        // UPDATED: Slightly increased upward drift speed so they feel more active
        speedY: randomBetween(-0.5, -0.15), 
        opacity: 0,
        opacityDirection: 1,
        // UPDATED: Bumped maxOpacity ranges up slightly so they are more visible
        maxOpacity:
          kind === "heart"
            ? randomBetween(0.4, 0.7)
            : kind === "firefly"
            ? randomBetween(0.6, 1.0)
            : randomBetween(0.3, 0.6),
        hue: palette[Math.floor(Math.random() * palette.length)],
        sway: randomBetween(0, Math.PI * 2),
        swaySpeed: randomBetween(0.002, 0.008),
        swayOffset: randomBetween(10, 30),
      };
    }

    function init() {
      particles = Array.from({ length: PARTICLE_COUNT }, makeParticle);
    }

    function step(p: Particle) {
      // gentle fade in/out cycle
      p.opacity += 0.003 * p.opacityDirection;
      if (p.opacity >= p.maxOpacity) p.opacityDirection = -1;
      if (p.opacity <= 0 && p.opacityDirection === -1) {
        Object.assign(p, makeParticle(), { y: height + 10, opacity: 0, opacityDirection: 1 });
        return;
      }

      p.sway += p.swaySpeed;
      p.x += p.speedX + Math.sin(p.sway) * 0.15;
      p.y += p.speedY;

      // recycle particles that drift off-screen
      if (p.y < -20 || p.x < -20 || p.x > width + 20) {
        Object.assign(p, makeParticle(), { y: height + 10 });
      }
    }

    function draw(p: Particle) {
      if (!ctx) return;
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.opacity);

      if (p.kind === "heart") {
        ctx.fillStyle = p.hue;
        drawHeart(ctx, p.x, p.y, p.size);
        ctx.fill();
      } else {
        // fireflies + dust: soft glowing circle with radial gradient
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.size * (p.kind === "firefly" ? 5 : 3)
        );
        gradient.addColorStop(0, p.hue);
        gradient.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(
          p.x,
          p.y,
          p.size * (p.kind === "firefly" ? 5 : 3),
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
      ctx.restore();
    }

    function loop() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        step(p);
        draw(p);
      });
      animationId = requestAnimationFrame(loop);
    }

    function handleResize() {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    init();
    if (!prefersReducedMotion) {
      loop();
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}