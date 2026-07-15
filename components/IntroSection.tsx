"use client";

import { useEffect, useState } from "react";

export default function IntroSection() {
  const [step, setStep] = useState(0);
  const [closing, setClosing] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t1 = setTimeout(() => setStep(1), 4200);
    const t2 = setTimeout(() => setStep(2), 8600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []);

  const openCase = () => {
    setClosing(true);
    document.body.style.overflow = "";
    window.scrollTo(0, 0);
    setTimeout(() => setHidden(true), 900);
  };

  if (hidden) return null;

  return (
    <div className={`intro ${closing ? "closing" : ""}`} aria-label="Intro">
      <div className="intro__grain" aria-hidden="true" />

      <div className="intro__stage">
        {/* scene 0 — the case file drops onto the desk */}
        {step === 0 && (
          <div className="intro__scene" key="s0">
            <div className="intro__folder">
              <span className="intro__stampline">CONFIDENTIAL</span>
              <p className="intro__case">Case File #0715</p>
              <p className="intro__row">Subject</p>
              <p className="intro__val">PRAPTI</p>
              <p className="intro__row">Status</p>
              <p className="intro__val intro__val--red">MISSING</p>
            </div>
          </div>
        )}

        {/* scene 1 */}
        {step === 1 && (
          <div className="intro__scene" key="s1">
            <p className="intro__line intro__line--sm">to whoever found this file…</p>
            <p className="intro__line">Something strange happened on July 15.</p>
          </div>
        )}

        {/* scene 2 */}
        {step === 2 && (
          <div className="intro__scene" key="s2">
            <p className="intro__line">We don&rsquo;t know where she went.</p>
            <p className="intro__line">We only know what she left behind.</p>
            <button className="intro__btn" onClick={openCase}>
              open case file →
            </button>
          </div>
        )}
      </div>

      <button className="intro__skip" onClick={openCase}>
        skip intro →
      </button>
    </div>
  );
}
