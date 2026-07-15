"use client";

import { useEffect, useRef, useState } from "react";

type Shot = { type: "photo" | "video"; src: string };

const PHOTOS = [
  "1", "2", "pic3", "pic4", "pic5", "pic6", "pic7", "pic8", "pic9", "pic10",
  "pic11", "pic12", "pic13", "pic14", "pic15", "pic16", "pic17",
];
const VIDS = ["video", "video2", "video3"];
const MEDIA: Shot[] = [
  ...PHOTOS.map((n) => ({ type: "photo" as const, src: `/assets/camera/${n}.jpeg` })),
  ...VIDS.map((n) => ({ type: "video" as const, src: `/assets/camera/${n}.mp4` })),
];

export default function CameraSection() {
  const [shot, setShot] = useState<Shot | null>(null);
  const [count, setCount] = useState(0);
  const [flash, setFlash] = useState(0);
  const [flashing, setFlashing] = useState(false);
  const deck = useRef<Shot[]>([]);
  const last = useRef<string>("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const musicPaused = useRef(false);

  const refill = () => {
    const d = [...MEDIA];
    for (let i = d.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [d[i], d[j]] = [d[j], d[i]];
    }
    if (d.length > 1 && d[d.length - 1].src === last.current) {
      [d[0], d[d.length - 1]] = [d[d.length - 1], d[0]];
    }
    deck.current = d;
  };

  const shoot = () => {
    if (deck.current.length === 0) refill();
    const next = deck.current.pop()!;
    last.current = next.src;
    setFlashing(true);
    setFlash((f) => f + 1);
    setTimeout(() => setFlashing(false), 170);
    setShot(next);
    setCount((c) => c + 1);
  };

  // videos play with sound + temporarily pause the music-section audio
  useEffect(() => {
    const bg = document.getElementById("scene-audio") as HTMLAudioElement | null;
    const v = videoRef.current;
    if (shot?.type === "video") {
      if (bg && !bg.paused) {
        bg.pause();
        musicPaused.current = true;
      }
      if (v) {
        v.currentTime = 0;
        v.muted = false;
        v.play().catch(() => {});
      }
    } else if (musicPaused.current && bg) {
      bg.play().catch(() => {});
      musicPaused.current = false;
    }
  }, [shot]);

  const resumeMusic = () => {
    const bg = document.getElementById("scene-audio") as HTMLAudioElement | null;
    if (musicPaused.current && bg) {
      bg.play().catch(() => {});
      musicPaused.current = false;
    }
  };

  // resume music if the camera scrolls out of view mid-video
  useEffect(() => {
    const el = document.getElementById("camera");
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (!e.isIntersecting) {
          videoRef.current?.pause();
          resumeMusic();
        }
      }),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="cam" id="camera" aria-label="Evidence 02: the film roll">
      <div className="cam__grain" aria-hidden="true" />
      <div className="cam__head">
        <p className="cam__evi">Evidence №2 · undeveloped film</p>
        <h2 className="cam__title">the film roll</h2>
        <p className="cam__cap">a life worth documenting — tap to develop a shot.</p>
      </div>

      <div className={`cambody ${flashing ? "flashing" : ""}`}>
        <div className="cambody__top">
          <span className="cambody__brand">
            the fifteen files <b>· disposable</b>
          </span>
          <span className="cambody__flash" />
          <span className="cambody__count">{String(count).padStart(2, "0")}/27</span>
        </div>

        <div className="camscreen" onClick={shoot} role="button" aria-label="Take a picture">
          {shot ? (
            shot.type === "photo" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={shot.src} alt="a memory" />
            ) : (
              <video ref={videoRef} src={shot.src} playsInline onEnded={resumeMusic} />
            )
          ) : (
            <div className="camscreen__empty">
              <span className="camscreen__cross" />
              <span className="camscreen__hint">tap to shoot</span>
            </div>
          )}
          <span className="camscreen__corners" aria-hidden="true" />
          <span className="camscreen__c2" aria-hidden="true" />
          {shot?.type === "video" && (
            <span className="camscreen__rec">
              <i />
              REC
            </span>
          )}
          {shot && <span className="camscreen__date">MAR 15 &rsquo;26</span>}
          <span key={flash} className={`camscreen__flash ${flash ? "go" : ""}`} aria-hidden="true" />
        </div>

        <div className="cambody__bottom">
          <span className="cambody__lens" aria-hidden="true" />
          <button className="cambody__shutter" onClick={shoot} aria-label="Shutter">
            shoot
          </button>
          <span className="cambody__wheel" aria-hidden="true" />
        </div>
      </div>

      <p className="cam__cue">tap again for the next shot ↺</p>
    </section>
  );
}
