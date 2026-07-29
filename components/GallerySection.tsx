"use client";

import { motion } from "framer-motion";
import Image from "next/image";

/**
 * GallerySection — "Memory Lane"
 * ------------------------------------------------------------------
 * A staggered polaroid grid. Each photo has its own tilt, a small
 * washi-tape accent, and straightens + lifts on hover.
 *
 * ✏️ EDIT ME: replace the `src` and `caption` fields below with your
 * own photos and captions. Drop your images in /public/images/ and
 * point the src at e.g. "/images/us-1.jpg".
 */

interface Photo {
  id: number;
  src: string;
  caption: string;
  tilt: number; // degrees
  span: "tall" | "normal";
}

const photos: Photo[] = [
  { id: 1, src: "/images/us-1.jpg", caption: "the day we met", tilt: -3, span: "normal" },
  { id: 2, src: "/images/us-2.jpg", caption: "favorite photo", tilt: 2, span: "tall" },
  { id: 3, src: "/images/us-3.jpg", caption: "my bhondu", tilt: -2, span: "normal" },
  { id: 4, src: "/images/us-4.jpg", caption: "cry sesh", tilt: 3, span: "normal" },
  { id: 5, src: "/images/us-5.jpg", caption: "baddieee", tilt: -1.5, span: "tall" },
  { id: 6, src: "/images/us-6.jpg", caption: "the cutest", tilt: 2.5, span: "normal" },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 20 },
  },
};

export default function GallerySection() {
  return (
    <section className="relative z-20 mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-28 md:py-36">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="mb-12 text-center sm:mb-16"
      >
        <p className="font-body text-xs uppercase tracking-[0.4em] text-rose-400">
          memory lane
        </p>
        <h2 className="mt-2 font-display text-2xl font-semibold text-rose-600 sm:text-3xl md:text-4xl lg:text-5xl">
          A little pile of our favorite moments
        </h2>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-14 lg:gap-x-10 lg:gap-y-16"
      >
        {photos.map((photo) => (
          <motion.figure
            key={photo.id}
            variants={item}
            style={{ rotate: photo.tilt }}
            whileHover={{
              rotate: 0,
              scale: 1.06,
              zIndex: 30,
              transition: { type: "spring", stiffness: 200, damping: 15 },
            }}
            className={`group relative rounded-sm bg-[#fffdf9] p-2 pb-6 shadow-[0_10px_20px_rgba(180,110,130,0.18)] sm:p-3 sm:pb-8 md:p-4 md:pb-10 ${
              photo.span === "tall" ? "md:mt-10" : ""
            }`}
          >
            {/* washi tape accent */}
            <span className="washi-tape" />

            <div className="relative aspect-[4/5] w-full overflow-hidden bg-blush-100">
              {/* Using a plain <img> keeps this a drop-in placeholder;
                  swap for next/image once real photos are in /public/images */}
              <Image
                src={photo.src}
                alt={photo.caption}
                fill
                sizes="(max-width: 640px) 45vw, 30vw"
                className="object-cover grayscale-0 transition duration-500 group-hover:scale-105"
              />
            </div>

            <figcaption className="mt-2 text-center font-script text-base text-rose-500 sm:text-lg md:text-xl">
              {photo.caption}
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>
    </section>
  );
}
