"use client";

import { useEffect, useRef, useState } from "react";
import { Tulip } from "@/components/Deco";
import LettersSection from "@/components/LettersSection";

export default function Home() {
  const [photo, setPhoto] = useState("/assets/prapti.jpg");
  const toPlaceholder = () => setPhoto((s) => (s.endsWith(".svg") ? s : "/assets/friend-fallback.svg"));
  const skyRef = useRef<HTMLDivElement>(null);
  const foundRef = useRef<HTMLSpanElement>(null);
  const burst = useRef(false);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    // scroll reveals
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("is-in")),
      { threshold: 0.25 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    // FOUND stamp slams in
    const foundIO = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && foundRef.current?.classList.add("pop")),
      { threshold: 0.6 }
    );
    if (foundRef.current) foundIO.observe(foundRef.current);

    // confetti + sparkles when the birthday enters
    const sky = skyRef.current;
    const colors = ["#ee87b4", "#c9a6dd", "#e11d48", "#e6b85c", "#f9aecd", "#8a5aa8", "#fff"];
    const spawn = () => {
      if (burst.current || reduce || !sky) return;
      burst.current = true;
      for (let i = 0; i < 80; i++) {
        const el = document.createElement("i");
        el.className = "confetti";
        const s = 6 + Math.random() * 9;
        el.style.cssText = `left:${Math.random() * 100}%;width:${s}px;height:${s * 1.5}px;background:${
          colors[(Math.random() * colors.length) | 0]
        };border-radius:${Math.random() > 0.5 ? "50%" : "2px"}`;
        sky.appendChild(el);
        el.animate(
          [
            { transform: `translateY(-10vh) rotate(0deg)`, opacity: 1 },
            { transform: `translateY(110vh) rotate(${Math.random() * 900 - 450}deg)`, opacity: 1 },
          ],
          { duration: 4500 + Math.random() * 4000, delay: Math.random() * 3500, iterations: Infinity, easing: "linear" }
        );
      }
      for (let i = 0; i < 24; i++) {
        const el = document.createElement("i");
        el.className = "spark";
        el.textContent = Math.random() > 0.5 ? "✦" : "✧";
        el.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;font-size:${8 + Math.random() * 14}px`;
        sky.appendChild(el);
        el.animate([{ opacity: 0, transform: "scale(.4)" }, { opacity: 1, transform: "scale(1.2)" }], {
          duration: 1200 + Math.random() * 1200,
          delay: Math.random() * 2500,
          direction: "alternate",
          iterations: Infinity,
          easing: "ease-in-out",
        });
      }
    };
    const bdayIO = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && spawn()), { threshold: 0.3 });
    if (sky?.parentElement) bdayIO.observe(sky.parentElement);

    return () => {
      io.disconnect();
      foundIO.disconnect();
      bdayIO.disconnect();
    };
  }, []);

  return (
    <>
      <div className="grain" aria-hidden="true" />

      {/* 01 · THE POSTER ------------------------------------ */}
      <section className="wall" aria-label="Missing poster">
        <div className="starfield" aria-hidden="true" />
        <div className="spot" aria-hidden="true" />

        <article className="poster reveal is-in">
          <span className="poster__tape poster__tape--l" />
          <span className="poster__tape poster__tape--r" />
          <p className="poster__kick">⚠ have you seen this girl ⚠</p>
          <h1 className="poster__title">
            MISS<span>ING</span>
          </h1>
          <p className="poster__sub">the prettiest girl in the world</p>

          <figure className="poster__photo">
            <span className="poster__stamp">15</span>
            {/* drop a real prapti.jpg into /public/assets */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo}
              alt="Prapti"
              draggable={false}
              onError={toPlaceholder}
              ref={(el) => {
                if (el && el.complete && el.naturalWidth === 0) toPlaceholder();
              }}
            />
            <figcaption>last seen: everywhere, glowing</figcaption>
          </figure>

          <div className="poster__rows">
            <div>
              <span className="k">NAME —</span> Prapti
            </div>
            <div>
              <span className="k">AGE —</span> newly fifteen (15)
            </div>
            <div>
              <span className="k">LAST SEEN —</span> in Jake&rsquo;s hoodie, ENHYPEN on repeat
            </div>
            <div>
              <span className="k">IDENTIFYING MARKS —</span> writes poetry, reads thrillers, loves tulips
            </div>
          </div>
          <p className="poster__reward">
            REWARD IF FOUND: <b>one (1) very happy birthday</b>
          </p>

          <div className="tabs" aria-hidden="true">
            {["♡", "생일", "축하", "해", "♡", "birthday", "♡"].map((t, i) => (
              <span className="tabs__tab" key={i}>
                {t}
              </span>
            ))}
          </div>
        </article>

        <p className="cue">scroll to search ↓</p>
      </section>

      {/* 02 · SEARCHING → FOUND ----------------------------- */}
      <section className="search" aria-label="Searching">
        <div className="starfield" aria-hidden="true" />
        <div className="search__inner">
          <p className="search__label">
            searching every café, every playlist, every poem
            <span className="search__dots">
              <i>.</i>
              <i>.</i>
              <i>.</i>
            </span>
          </p>
          <p className="found">
            <span className="found__stamp" ref={foundRef}>
              FOUND
            </span>
          </p>
          <p className="search__cap">she was never lost — just growing up.</p>
        </div>
      </section>

      {/* 03 · BIRTHDAY -------------------------------------- */}
      <section className="bday" aria-label="Happy birthday">
        <div className="bday__sky" ref={skyRef} aria-hidden="true" />
        <div className="bday__inner">
          <h2 className="bday__ko reveal">생일 축하해</h2>
          <p className="bday__en reveal">happy birthday</p>
          <p className="bday__name reveal">Prapti</p>

          <div className="cake reveal">
            <span className="cake__glow" />
            <span className="cake__flame" />
            <span className="cake__candle" />
            <span className="cake__tier cake__top" />
            <span className="cake__tier cake__mid" />
            <span className="cake__tier cake__base" />
            <span className="cake__plate" />
          </div>

          <p className="bday__note reveal">make a wish, prettiest girl in the world.</p>
        </div>
      </section>

      {/* 04 · LETTERS --------------------------------------- */}
      <LettersSection />

      {/* 05 · MESSAGE --------------------------------------- */}
      <section className="msg" aria-label="Message">
        <div className="msg__inner">
          <p className="msg__eyebrow reveal">case notes</p>
          <p className="reveal">
            fifteen looks unfairly good on you. here&rsquo;s to a year of{" "}
            <em>loud songs and quiet mornings</em> — tulips on the windowsill,
            poems in the margins, thrillers you can&rsquo;t put down.
          </p>
          <p className="reveal">
            keep being the plot twist nobody sees coming. keep being so easy to
            love it should be a crime.
          </p>
          <Tulip className="reveal" style={{ marginTop: "1rem", transform: "rotate(-6deg)" }} />
        </div>
      </section>

      {/* 05 · ENDING ---------------------------------------- */}
      <section className="end" aria-label="Ending">
        <div className="starfield" aria-hidden="true" />
        <div className="end__inner">
          <div className="end__poem reveal">
            <p>may your year be all soft mornings and loud songs,</p>
            <p>and every mystery worth solving.</p>
          </div>
          <h2 className="end__wish reveal">
            Happy Birthday, Prapti <span className="hb">♡</span>
          </h2>
        </div>
      </section>
    </>
  );
}
