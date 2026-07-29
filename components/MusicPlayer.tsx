"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/**
 * MusicPlayer — the top-right "island"
 * ------------------------------------------------------------------
 * A small floating pill that shows the currently playing song and
 * toggles play/pause. Playback state is lifted to the parent page so
 * the envelope-open moment in HeroSection can also start the music
 * (browsers require a real user gesture to allow audio — a click on
 * the envelope or on this island both count).
 *
 * ✏️ EDIT ME: set SONG_TITLE / SONG_ARTIST, and drop your mp3 at
 * public/audio/ then update AUDIO_SRC to match.
 */

const SONG_TITLE = "Tum Hi Ho"; // ✏️ EDIT ME
const SONG_ARTIST = "Arijit Singh"; // ✏️ EDIT ME
const AUDIO_SRC = "/audio/our-song.mp3"; // ✏️ EDIT ME: path to your mp3

interface MusicPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
}

export default function MusicPlayer({
  isPlaying,
  setIsPlaying,
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => {
        // Autoplay/playback was blocked (e.g. missing file, browser policy) —
        // fall back to the paused visual state so the button stays accurate.
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, setIsPlaying]);

  return (
    <>
      {/* ✏️ EDIT ME: swap AUDIO_SRC above for your own track in public/audio/ */}
      <audio ref={audioRef} src={AUDIO_SRC} loop preload="none" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 100, damping: 20 }}
        className="fixed right-4 top-4 z-50 sm:right-6 sm:top-6"
      >
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? "Pause music" : "Play music"}
          className="flex items-center gap-2 rounded-full border border-white/40 bg-white/50 py-2 pl-2 pr-4 shadow-[0_8px_20px_rgba(201,115,138,0.25)] backdrop-blur-md transition hover:bg-white/65 sm:gap-3 sm:py-2.5 sm:pl-2.5 sm:pr-5"
        >
          <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-rose-500 text-cream sm:h-9 sm:w-9">
            {isPlaying ? (
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-cream">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-cream">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </span>

          <span className="flex flex-col items-start leading-tight">
            <span className="max-w-[110px] truncate font-body text-xs font-semibold text-rose-600 sm:max-w-[150px] sm:text-sm">
              {SONG_TITLE}
            </span>
            <span className="max-w-[110px] truncate font-body text-[10px] text-rose-500/70 sm:max-w-[150px] sm:text-xs">
              {SONG_ARTIST}
            </span>
          </span>

          {/* tiny equalizer bars, only animate while playing */}
          <span className="ml-1 flex h-4 flex-none items-end gap-[2px]">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-[3px] rounded-full bg-rose-400"
                animate={
                  isPlaying
                    ? { height: ["30%", "100%", "50%", "90%", "30%"] }
                    : { height: "30%" }
                }
                transition={{
                  duration: 1.1,
                  repeat: isPlaying ? Infinity : 0,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
              />
            ))}
          </span>
        </button>
      </motion.div>
    </>
  );
}
