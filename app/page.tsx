"use client";

import { useEffect } from "react";
import Boot from "@/components/Boot";
import Install from "@/components/Install";
import Ink from "@/components/Ink";
import Fifteen from "@/components/Fifteen";
import Wisdom from "@/components/Wisdom";
import EnhypenAudio from "@/components/EnhypenAudio";
import Protocol from "@/components/Protocol";
import Celebrate from "@/components/Celebrate";
import Wish from "@/components/Wish";
import Letters from "@/components/Letters";
import Ending from "@/components/Ending";
import { initExperience } from "@/lib/experience";

export default function Home() {
  useEffect(() => {
    const cleanup = initExperience();
    return cleanup;
  }, []);

  return (
    <>
      {/* paper grain + ambient glow */}
      <div className="grain" aria-hidden="true" />
      <div className="ambient" aria-hidden="true">
        <span className="orb orb--1" />
        <span className="orb orb--2" />
        <span className="orb orb--3" />
      </div>

      {/* persistent dossier chrome */}
      <div className="dossier-frame" aria-hidden="true" />
      <span className="case-chrome case-chrome--tl" aria-hidden="true">Case №15 · Confidential</span>
      <span className="case-chrome case-chrome--br" aria-hidden="true">Property of Prapti ♡</span>

      {/* intro scenes (fixed, sequential) */}
      <Boot />
      <Install />
      <Ink />

      {/* the case file (revealed after the note) */}
      <main className="doc" id="doc" aria-hidden="true">
        <Fifteen />
        <Wisdom />
        <EnhypenAudio />
        <Protocol />
        <Celebrate />
        <Wish />
        <Letters />
        <Ending />
      </main>

      {/* drop /public/assets/music.mp3 in to use your own song;
          otherwise a gentle music-box melody is synthesised in-browser. */}
      <audio id="bgm" loop preload="auto">
        <source src="/assets/music.mp3" type="audio/mpeg" />
      </audio>
    </>
  );
}
