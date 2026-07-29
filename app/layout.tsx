import type { Metadata } from "next";
import { Cormorant_Garamond, Caveat, Quicksand } from "next/font/google";
import "./globals.css";

// Elegant display serif for the big reveal headline
const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

// Handwritten script for the love letter
const scriptFont = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-script",
});

// Soft, rounded body copy
const bodyFont = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Happy Girlfriend's Day",
  description: "A little something made just for you.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${displayFont.variable} ${scriptFont.variable} ${bodyFont.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
