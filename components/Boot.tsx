import { Tulip } from "./Deco";

export default function Boot() {
  return (
    <section className="scene scene--boot is-active" id="boot" aria-label="Open the case file">
      <div className="boot__inner">
        <span className="stamp stamp--sm boot__stamp" style={{ transform: "rotate(7deg)" }}>
          Confidential
        </span>
        <Tulip className="boot__tulip" />

        <div className="boot__head">
          <p className="boot__case">Case №15 · The Fifteen Files</p>
          <h1 className="boot__title">the disappearance of childhood</h1>
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
            src="/assets/baby.jpg"
            alt="Baby Prapti"
            draggable={false}
            onError={(e) => {
              const t = e.currentTarget;
              t.onerror = null;
              t.src = "/assets/baby.svg";
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
