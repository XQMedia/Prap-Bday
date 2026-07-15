"use client";

import { useEffect, useRef, useState } from "react";

const DETAILS = [
  "NAME — Prapti",
  "AGE — newly fifteen (15)",
  "LAST SEEN — in her room watching jake edits",
  "IDENTIFYING MARKS — waist missing, ethereal face card, stares at hot men and women, JAKE, COFFEE",
];

export default function PosterDetails() {
  const [typed, setTyped] = useState<string[]>(() => DETAILS.map(() => ""));
  const [cur, setCur] = useState(-1);
  const rowsRef = useRef<HTMLDivElement>(null);
  const runId = useRef(0);
  const timer = useRef<number | null>(null);

  const type = () => {
    runId.current += 1;
    const my = runId.current;
    if (timer.current) window.clearTimeout(timer.current);
    setTyped(DETAILS.map(() => ""));
    setCur(0);
    let li = 0;
    let ci = 0;
    const speed = 13; // fast
    const step = () => {
      if (my !== runId.current) return;
      if (li >= DETAILS.length) {
        setCur(-1);
        return;
      }
      ci += 1;
      const idx = li; // capture before li mutates (updater may run async)
      const val = DETAILS[idx].slice(0, ci);
      setTyped((p) => {
        const c = p.slice();
        c[idx] = val;
        return c;
      });
      setCur(idx);
      if (ci >= DETAILS[idx].length) {
        li += 1;
        ci = 0;
      }
      timer.current = window.setTimeout(step, speed);
    };
    timer.current = window.setTimeout(step, 200);
  };

  useEffect(() => {
    const el = rowsRef.current;
    if (!el) return;
    let armed = false; // only re-type once it has left and re-entered
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            if (armed) type();
          } else {
            armed = true;
          }
        }),
      { threshold: 0.4 }
    );
    io.observe(el);
    const onIntro = () => type();
    window.addEventListener("intro-open", onIntro);
    // no intro on the page (e.g. deep-link)? type shortly after load
    const t = window.setTimeout(() => {
      if (!document.querySelector(".intro")) type();
    }, 400);
    return () => {
      io.disconnect();
      window.removeEventListener("intro-open", onIntro);
      window.clearTimeout(t);
      if (timer.current) window.clearTimeout(timer.current);
      runId.current += 1;
    };
  }, []);

  return (
    <div className="poster__rows" ref={rowsRef}>
      {DETAILS.map((_, i) => {
        const t = typed[i] || "";
        const at = t.indexOf(" — ");
        const keyPart = at === -1 ? t : t.slice(0, at + 2); // include " —"
        const rest = at === -1 ? "" : t.slice(at + 2);
        return (
          <div key={i}>
            <span className="k">{keyPart}</span>
            {rest}
            {cur === i && <span className="tw-cur" />}
          </div>
        );
      })}
    </div>
  );
}
