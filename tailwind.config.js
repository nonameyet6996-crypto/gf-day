/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ---- Design tokens: warm, lowkey, cozy romantic palette ----
        cream: {
          DEFAULT: "#FFFBF5",
          deep: "#FCF3E8",
        },
        blush: {
          50: "#FFF6F6",
          100: "#FCEBEE",
          200: "#F7D9DF",
          300: "#F0BFC9",
          400: "#E4A0B0",
          500: "#D98299",
        },
        lavender: {
          100: "#F3EEFB",
          200: "#E3D9F0",
          300: "#D1C2E8",
          400: "#B9A4DA",
        },
        rose: {
          400: "#D98BA0",
          500: "#C9738A",
          600: "#B8677D",
          700: "#9C5268",
        },
        gold: {
          200: "#F7E6C4",
          300: "#F5D6A8",
          400: "#EEC17E",
        },
      },
      fontFamily: {
        // Display serif for the big reveal headline
        display: ["var(--font-display)", "serif"],
        // Handwritten/script feel for the love letter
        script: ["var(--font-script)", "cursive"],
        // Rounded, soft body copy
        body: ["var(--font-body)", "sans-serif"],
      },
      keyframes: {
        bob: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-14px) rotate(4deg)" },
        },
        bobSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        twinkle: {
          "0%, 100%": { opacity: 0.25, transform: "scale(0.9)" },
          "50%": { opacity: 1, transform: "scale(1.1)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px 4px rgba(217,130,153,0.35)" },
          "50%": { boxShadow: "0 0 36px 10px rgba(217,130,153,0.55)" },
        },
        sealCrack: {
          "0%": { transform: "scale(1) rotate(0deg)", opacity: 1 },
          "60%": { transform: "scale(1.15) rotate(-6deg)", opacity: 1 },
          "100%": { transform: "scale(0.6) rotate(8deg)", opacity: 0 },
        },
      },
      animation: {
        bob: "bob 6s ease-in-out infinite",
        bobSlow: "bobSlow 8s ease-in-out infinite",
        twinkle: "twinkle 3.2s ease-in-out infinite",
        glowPulse: "glowPulse 2.8s ease-in-out infinite",
      },
      backgroundImage: {
        "warm-radial":
          "radial-gradient(circle at 20% 20%, rgba(247,217,223,0.55), transparent 45%), radial-gradient(circle at 80% 30%, rgba(227,217,240,0.5), transparent 50%), radial-gradient(circle at 50% 90%, rgba(245,214,168,0.35), transparent 55%)",
      },
    },
  },
  plugins: [],
};
