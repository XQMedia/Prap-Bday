"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Book = {
  spine: string; // short label on the spine
  title: string; // cover title
  color: string; // cover gradient
  h: number; // spine height px
  msg: string; // secret note
  sign?: string;
};

// EDIT ME — the covers + secret notes hidden inside each book
const BOOKS: Book[] = [
  {
    spine: "Girl, 15",
    title: "Girl, Interrupted at 15",
    color: "linear-gradient(135deg,#7a2338,#4a1220)",
    h: 224,
    msg: "you are not a mystery to be solved.\nyou are a whole world to be read, slowly, on purpose.",
    sign: "keep turning the page ♡",
  },
  {
    spine: "Rainy Day",
    title: "Poems for a Rainy Day",
    color: "linear-gradient(135deg,#274a38,#122a1f)",
    h: 208,
    msg: "some days will pour.\nlet them. tulips drink the rain and bloom anyway.\nso will you.",
  },
  {
    spine: "Missing Ch.",
    title: "The Missing Chapter",
    color: "linear-gradient(135deg,#243a63,#141f38)",
    h: 236,
    msg: "the childhood isn't lost — it's just the prologue.\nthe best chapters start at fifteen.",
  },
  {
    spine: "Tulips",
    title: "Tulips at Midnight",
    color: "linear-gradient(135deg,#8a6320,#4a3410)",
    h: 200,
    msg: "planting this here so you find it later:\nyou are so deeply, ridiculously loved.",
    sign: "— everyone who knows you",
  },
  {
    spine: "On Repeat",
    title: "Songs on Repeat",
    color: "linear-gradient(135deg,#4a2350,#241030)",
    h: 220,
    msg: "track 15 was always about you.\nplay it loud. dance badly. it's your year.",
  },
  {
    spine: "Unforgettable",
    title: "How to Be Unforgettable",
    color: "linear-gradient(135deg,#1a4a44,#0d2a26)",
    h: 212,
    msg: "chapter one: already done.\nyou've been unforgettable since the day you arrived.\nhappy birthday, prettiest girl in the world.",
    sign: "case closed ♡",
  },
];

export default function LibrarySection() {
  const [open, setOpen] = useState<number | null>(null);
  const [flip, setFlip] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [motes, setMotes] = useState<React.CSSProperties[]>([]);
  const [rain, setRain] = useState<React.CSSProperties[]>([]);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    // generated client-side to avoid hydration mismatch
    setMotes(
      Array.from({ length: 26 }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${40 + Math.random() * 55}%`,
        animationDuration: `${6 + Math.random() * 8}s`,
        animationDelay: `${Math.random() * 8}s`,
        transform: `scale(${0.5 + Math.random()})`,
      }))
    );
    setRain(
      Array.from({ length: 16 }, () => ({
        left: `${Math.random() * 100}%`,
        animationDuration: `${0.5 + Math.random() * 0.5}s`,
        animationDelay: `${Math.random() * 2}s`,
      }))
    );
  }, []);

  const openBook = (i: number) => {
    setOpen(i);
    setFlip(false);
    setTimeout(() => setFlip(true), 430);
  };
  const close = () => {
    setOpen(null);
    setFlip(false);
  };

  const B = open !== null ? BOOKS[open] : null;

  return (
    <section className="library" id="library" aria-label="Evidence 03: recovered personal library">
      <div className="library__wood" aria-hidden="true" />
      <div className="rainwin" aria-hidden="true">
        {rain.map((s, i) => (
          <b key={i} style={s} />
        ))}
      </div>

      {/* hanging lamp + light */}
      <div className="lamp" aria-hidden="true">
        <span className="lamp__wire" />
        <span className="lamp__shade" />
        <span className="lamp__bulb" />
      </div>
      <div className="lamp__cone" aria-hidden="true" />
      <div className="dust" aria-hidden="true">
        {motes.map((s, i) => (
          <i key={i} style={s} />
        ))}
      </div>

      <div className="library__head">
        <p className="library__evi">Evidence №3 · recovered personal library</p>
        <h2 className="library__title">a forgotten reading room</h2>
        <p className="library__cap">dust, rain, and everything she couldn&rsquo;t stop reading.</p>
      </div>

      <div className="checkout" aria-hidden="true">
        <p className="checkout__t">public library · date due</p>
        <p className="checkout__b">
          Borrower: <span className="st">PRAPTI</span>
        </p>
        <p className="checkout__rows">
          MAR 15 — never returned
          <br />
          status: overdue by a lifetime of good stories
        </p>
      </div>

      <div className="shelf">
        {BOOKS.map((b, i) => (
          <button
            className="spine"
            key={i}
            onClick={() => openBook(i)}
            style={{ height: b.h, background: b.color }}
            aria-label={`Open ${b.title}`}
          >
            {b.title}
          </button>
        ))}
      </div>

      <p className="library__cue">pull a book from the shelf ↑</p>

      {/* book open modal — portalled to <body> so it escapes the section's
          isolated stacking context and covers the whole viewport */}
      {mounted &&
        createPortal(
          <div className={`lib-modal ${open !== null ? "open" : ""}`} aria-hidden={open === null}>
            <div className="lib-modal__bg" onClick={close} />
            {open !== null && (
              <button className="lib-modal__close" onClick={close} aria-label="Close">
                ×
              </button>
            )}
            {B && (
              <div className={`book ${flip ? "flip" : ""}`}>
                <div className="book__inside">
                  <p className="book__label">a note tucked inside</p>
                  <p className="book__msg">{B.msg}</p>
                  {B.sign && <p className="book__sign">{B.sign}</p>}
                </div>
                <div className="book__cover" style={{ background: B.color }}>
                  <p className="ct">{B.title}</p>
                  <p className="cs">property of prapti</p>
                  <p className="cw">The Fifteen Files · No. {String((open ?? 0) + 1).padStart(2, "0")}</p>
                </div>
                <p className="book__hint">{flip ? "click × to close" : "opening…"}</p>
              </div>
            )}
          </div>,
          document.body
        )}
    </section>
  );
}
