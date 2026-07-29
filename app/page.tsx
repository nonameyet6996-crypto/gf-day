"use client";

import { useState } from "react";
import ParticleBackground from "@/components/ParticleBackground";
import MusicPlayer from "@/components/MusicPlayer";
import HeroSection from "@/components/HeroSection";
import GallerySection from "@/components/GallerySection";
import LoveLetterSection from "@/components/LoveLetterSection";
import ConfettiBurst from "@/components/ConfettiBurst";

export default function Home() {
  // Playback state lives here so both the top-right music island and the
  // envelope-open moment (a real user click/tap) can start the song.
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <main className="relative min-h-screen w-full bg-cream bg-warm-radial">
      {/* Ambient canvas particles: fireflies, fading hearts, stardust —
          sits behind everything, fixed so it drifts across the whole scroll */}
      <ParticleBackground />

      {/* Top-right "island" — song title/artist + play/pause */}
      <MusicPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />

      <div className="relative z-10">
        {/* Section 1 — envelope reveal + headline. Opening the envelope
            also starts the music, since it's a genuine user gesture. */}
        <HeroSection onOpen={() => setIsPlaying(true)} />

        {/* Section 2 — polaroid memory gallery */}
        <GallerySection />

        {/* Section 3 — glassmorphism love letter */}
        <LoveLetterSection />

        {/* Grand finale — heart confetti burst */}
        <ConfettiBurst />

        <footer className="relative z-20 pb-10 text-center font-body text-xs uppercase tracking-[0.3em] text-rose-400/70">
          made with a very full heart
        </footer>
      </div>
    </main>
  );
}
