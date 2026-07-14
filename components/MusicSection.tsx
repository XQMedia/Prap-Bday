"use client";

import { useEffect, useRef, useState } from "react";

const TRACKS = [
  { title: "Bite Me", src: "/assets/bite-me.mp3" },
  { title: "Sweet Venom", src: "/assets/sweet-venom.mp3" },
  { title: "Fatal Trouble", src: "/assets/fatal-trouble.mp3" },
  { title: "Moonstruck", src: "/assets/moonstruck.mp3" },
  { title: "Highway 1009", src: "/assets/highway-1009.mp3" },
];
const ARTS = ["/assets/jake1.jpeg", "/assets/jake2.jpeg", "/assets/jake3.jpeg", "/assets/jake4.jpeg"];

const fmt = (t: number) =>
  isFinite(t) ? `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}` : "0:00";

export default function MusicSection() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [cur, setCur] = useState(0);
  const [dur, setDur] = useState(0);

  const play = (i: number) => {
    const a = audioRef.current;
    if (!a) return;
    if (i === idx) {
      if (a.paused) a.play();
      else a.pause();
      return;
    }
    setIdx(i);
    a.src = TRACKS[i].src;
    a.play().catch(() => {});
  };

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onT = () => setCur(a.currentTime);
    const onD = () => setDur(a.duration);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnd = () => play((idx + 1) % TRACKS.length);
    a.addEventListener("timeupdate", onT);
    a.addEventListener("loadedmetadata", onD);
    a.addEventListener("durationchange", onD);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("ended", onEnd);
    return () => {
      a.removeEventListener("timeupdate", onT);
      a.removeEventListener("loadedmetadata", onD);
      a.removeEventListener("durationchange", onD);
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("ended", onEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audioRef.current;
    if (!a || !dur) return;
    const r = e.currentTarget.getBoundingClientRect();
    a.currentTime = ((e.clientX - r.left) / r.width) * dur;
  };

  return (
    <section className="music" id="music" aria-label="Evidence: recovered audio">
      <div className="music__jakes" aria-hidden="true">
        {/* eslint-disable @next/next/no-img-element */}
        <img src="/assets/jake1.jpeg" alt="" />
        <img src="/assets/jake2.jpeg" alt="" />
        <img src="/assets/jake3.jpeg" alt="" />
        <img src="/assets/jake4.jpeg" alt="" />
        {/* eslint-enable @next/next/no-img-element */}
      </div>
      <div className="music__tint" aria-hidden="true" />
      <div className="music__scan" aria-hidden="true" />
      <div className="music__grain" aria-hidden="true" />
      <div className="music__tape" aria-hidden="true">
        <span>evidence</span> · do not cross · evidence · do not cross
      </div>

      <div className="music__head">
        <p className="music__evi">Evidence №2 · recovered audio</p>
        <h2 className="music__title">
          DARK <b>BLOOD</b>
        </h2>
        <p className="music__cap">found playing on loop at the scene.</p>
      </div>

      <div className="mplayer">
        <div className="mplayer__now">
          <div className={`mplayer__art ${playing ? "spin" : ""}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ARTS[idx % ARTS.length]} alt="cover" />
          </div>
          <div className="mplayer__meta">
            <p className="mplayer__label">{playing ? "▶ now playing" : "paused"}</p>
            <p className="mplayer__name">{TRACKS[idx].title}</p>
            <p className="mplayer__by">ENHYPEN · exhibit audio</p>
          </div>
          <button className="mplayer__play" onClick={() => play(idx)} aria-label="Play / pause">
            {playing ? "❚❚" : "▶"}
          </button>
        </div>

        <div className="mplayer__bar" onClick={seek}>
          <span className="mplayer__fill" style={{ width: dur ? `${(cur / dur) * 100}%` : "0%" }} />
        </div>
        <div className="mplayer__time">
          <span>{fmt(cur)}</span>
          <span>{fmt(dur)}</span>
        </div>

        <div className="mplayer__list">
          {TRACKS.map((t, i) => (
            <div
              className={`mtrack ${i === idx ? "active" : ""} ${i === idx && playing ? "playing" : ""}`}
              key={i}
              onClick={() => play(i)}
            >
              <span className="mtrack__no">
                {i === idx && playing ? (
                  <span className="meq">
                    <i />
                    <i />
                    <i />
                  </span>
                ) : (
                  String(i + 1).padStart(2, "0")
                )}
              </span>
              <span className="mtrack__name">{t.title}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="music__cue">the trail continues ↓</p>

      <audio ref={audioRef} src={TRACKS[0].src} preload="metadata" />
    </section>
  );
}
