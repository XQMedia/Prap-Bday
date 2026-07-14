"use client";

import { useState } from "react";
import { Tulip } from "./Deco";

export default function Boot() {
  // prefer a real baby.jpg; fall back to the placeholder SVG (handles the
  // case where the 404 fires before hydration via the ref check).
  const [babySrc, setBabySrc] = useState("/assets/baby.jpg");
  const toPlaceholder = () => setBabySrc((s) => (s.endsWith("baby.svg") ? s : "/assets/baby.svg"));
  return (
    <section className="scene scene--boot sec--dark is-active" id="boot" aria-label="Open the case file">
      <div className="starfield" aria-hidden="true" />
      <span className="glow" style={{ width: "44vmax", height: "44vmax", left: "50%", top: "56%", transform: "translate(-50%,-50%)", background: "radial-gradient(circle,rgba(255,110,150,.28),transparent 65%)" }} aria-hidden="true" />

      <div className="boot__inner">
        <span className="stamp stamp--sm boot__stamp" style={{ transform: "rotate(7deg)" }}>
          Confidential
        </span>
        <Tulip className="boot__tulip" />

        <div className="boot__head">
          <p className="boot__case">Case №15 · The Fifteen Files</p>
          <h1 className="boot__title glow-text">the girl who kept growing</h1>
          <p className="boot__hint" id="bootHint">file exhibit A to open the case →</p>
        </div>

        <div
          className="photo-drag"
          id="photoDrag"
          role="img"
          aria-label="Exhibit A — baby photo of Prapti — drag me into the case folder"
        >
          <span className="photo-drag__exhibit">EXHIBIT A</span>
          {/* drop a real baby.jpg into /public/assets to replace the placeholder */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={babySrc}
            alt="Baby Prapti"
            draggable={false}
            onError={toPlaceholder}
            ref={(el) => {
              if (el && el.complete && el.naturalWidth === 0) toPlaceholder();
            }}
          />
          <span className="photo-drag__tape photo-drag__tape--l" />
          <span className="photo-drag__tape photo-drag__tape--r" />
          <span className="photo-drag__caption">the subject · age 0</span>
        </div>

        <div className="folder" id="folder" aria-label="Case folder">
          <div className="folder__shape">
            <div className="folder__tab" />
            <div className="folder__front" />
            <span className="folder__seal">15</span>
          </div>
          <span className="folder__label">Half&nbsp;Way&nbsp;to&nbsp;30</span>
        </div>
      </div>
    </section>
  );
}
