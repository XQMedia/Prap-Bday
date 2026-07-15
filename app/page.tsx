"use client";

import { useEffect, useRef, useState } from "react";
import { Tulip } from "@/components/Deco";
import IntroSection from "@/components/IntroSection";
import PosterDetails from "@/components/PosterDetails";
import MusicSection from "@/components/MusicSection";
import CameraSection from "@/components/CameraSection";
import LettersSection from "@/components/LettersSection";

export default function Home() {
  const [photo, setPhoto] = useState("/assets/prapti.jpg");
  const toPlaceholder = () => setPhoto((s) => (s.endsWith(".svg") ? s : "/assets/friend-fallback.svg"));
  const skyRef = useRef<HTMLDivElement>(null);
  const foundRef = useRef<HTMLSpanElement>(null);
  const burst = useRef(false);
  const [cakeMsg, setCakeMsg] = useState(false);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    // scroll reveals — toggle so they float up EVERY time they enter view
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.target.classList.toggle("is-in", e.isIntersecting)),
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    // FOUND stamp slams in every time it enters
    const foundIO = new IntersectionObserver(
      (es) => es.forEach((e) => e.target.classList.toggle("pop", e.isIntersecting)),
      { threshold: 0.6 }
    );
    if (foundRef.current) foundIO.observe(foundRef.current);

    // replay the poster's float-up when the intro is dismissed
    const onIntroOpen = () => {
      requestAnimationFrame(() => {
        document.querySelectorAll<HTMLElement>(".wall .reveal").forEach((el) => {
          el.classList.remove("is-in");
          void el.offsetWidth; // force reflow so the transition restarts
          el.classList.add("is-in");
        });
      });
    };
    window.addEventListener("intro-open", onIntroOpen);

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
      // balloons floating up
      for (let i = 0; i < 9; i++) {
        const el = document.createElement("i");
        el.className = "balloon";
        el.style.cssText = `left:${4 + i * 11 + Math.random() * 4}%;background:radial-gradient(circle at 34% 28%,#fff,${
          colors[i % colors.length]
        })`;
        sky.appendChild(el);
        el.animate(
          [
            { transform: "translateY(120vh) rotate(-4deg)" },
            { transform: "translateY(-130vh) rotate(4deg)" },
          ],
          { duration: 11000 + Math.random() * 7000, delay: Math.random() * 6000, iterations: Infinity, easing: "linear" }
        );
      }
    };

    const bdayIO = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && spawn()),
      { threshold: 0.3 }
    );
    if (sky?.parentElement) bdayIO.observe(sky.parentElement);

    return () => {
      io.disconnect();
      foundIO.disconnect();
      bdayIO.disconnect();
      window.removeEventListener("intro-open", onIntroOpen);
    };
  }, []);

  return (
    <>
      <IntroSection />
      <div className="grain" aria-hidden="true" />

      {/* 01 · THE POSTER ------------------------------------ */}
      <section className="wall" aria-label="Missing poster">
        <div className="starfield" aria-hidden="true" />
        <div className="spot" aria-hidden="true" />

        <article className="poster">
          <span className="poster__tape poster__tape--l" />
          <span className="poster__tape poster__tape--r" />
          <p className="poster__kick reveal">⚠ have you seen her ⚠</p>
          <h1 className="poster__title reveal" style={{ transitionDelay: "0.08s" }}>
            MISS<span>ING</span>
          </h1>
          <p className="poster__sub reveal" style={{ transitionDelay: "0.16s" }}>
            the prettiest girl in the world
          </p>

          <figure className="poster__photo reveal" style={{ transitionDelay: "0.24s" }}>
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
          </figure>

          <PosterDetails />
          <p className="poster__reward reveal" style={{ transitionDelay: "2.7s" }}>
            REWARD IF FOUND: <b>we don&rsquo;t put a price on women #FEMINISM</b>
          </p>

          <div className="tabs reveal" style={{ transitionDelay: "0.48s" }} aria-hidden="true">
            {["♡", "생일", "축하", "해", "♡", "birthday", "♡"].map((t, i) => (
              <span className="tabs__tab" key={i}>
                {t}
              </span>
            ))}
          </div>
        </article>

        <p className="cue">scroll to search ↓</p>
      </section>

      {/* 02 · MUSIC (evidence: recovered audio) ------------- */}
      <MusicSection />

      {/* 02b · CAMERA (evidence: the film roll) ------------- */}
      <CameraSection />

      {/* 03 · SEARCHING → FOUND ----------------------------- */}
      <section className="search" aria-label="Searching">
        <div className="starfield" aria-hidden="true" />
        <div className="search__inner">
          <p className="search__label reveal">
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
          <p className="search__cap reveal" style={{ transitionDelay: "0.2s" }}>
            she was never lost — just growing up.
          </p>
        </div>
      </section>

      {/* 03 · BIRTHDAY -------------------------------------- */}
      <section className="bday" aria-label="Happy birthday">
        <div className="bday__sky" ref={skyRef} aria-hidden="true" />
        <div className="bday__inner">
          <h2 className="bday__ko reveal">생일 축하해</h2>
          <p className="bday__en reveal" style={{ transitionDelay: "0.12s" }}>
            happy birthday
          </p>
          <p className="bday__name reveal" style={{ transitionDelay: "0.24s" }}>
            Prapti
          </p>

          <div className="cake-wrap reveal" style={{ transitionDelay: "0.38s" }}>
            <button className="cake" onClick={() => setCakeMsg(true)} aria-label="the cake">
              <span className="cake__glow" />
              <span className="cake__flame" />
              <span className="cake__candle" />
              <span className="cake__tier cake__top" />
              <span className="cake__tier cake__mid" />
              <span className="cake__tier cake__base" />
              <span className="cake__plate" />
            </button>
          </div>
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
            <em>mental breakdowns and uh mental breakdowns</em> — but amidst all
            of that we can still find time to have more mental breakdowns. and
            yeah, keep laughing at your problems because crying won&rsquo;t make
            them go away, so might as well laugh about it haha.{" "}
            <em>I LOVE YOU SO MUCH</em> and i am glad our introvert asses decided
            to be friends.
          </p>
          <p className="reveal msg__aside">
            (this is my letter btw — i forgot to write one so i&rsquo;m half-drunk improv-ing)
          </p>
          <Tulip className="reveal" style={{ marginTop: "1rem", transform: "rotate(-6deg)" }} />
        </div>
      </section>

      {/* 05 · ENDING ---------------------------------------- */}
      <section className="end" aria-label="Ending">
        <div className="starfield" aria-hidden="true" />
        <div className="end__inner">
          <div className="end__poem reveal">
            <p>congrats on being 15 twin.</p>
            <p>enjoy life</p>
          </div>
          <h2 className="end__wish reveal" style={{ transitionDelay: "0.25s" }}>
            Happy Birthday <span className="hb">♡</span>
          </h2>
        </div>
      </section>

      {/* cake easter-egg popup */}
      {cakeMsg && (
        <div className="cakepop" onClick={() => setCakeMsg(false)}>
          <div className="cakepop__card" onClick={(e) => e.stopPropagation()}>
            <p className="cakepop__emoji">🎂</p>
            <p className="cakepop__big">nothing to see here.</p>
            <p className="cakepop__sub">
              this was suppose to be something cool but issok
            </p>
            <p className="cakepop__nxt">nxt yt · nxt yt</p>
            <button className="cakepop__close" onClick={() => setCakeMsg(false)}>
              close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
