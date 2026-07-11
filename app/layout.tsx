import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Fraunces,
  Dancing_Script,
  Caveat,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});
const display = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});
const hand = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hand",
  display: "swap",
});
const handAlt = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hand-alt",
  display: "swap",
});
const mono = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Protocol 15 · for Prapti",
  description: "Half way to 30 — a little universe made for Prapti's birthday.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${display.variable} ${hand.variable} ${handAlt.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
