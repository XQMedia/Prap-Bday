export default function Boot() {
  return (
    <section className="scene scene--boot is-active" id="boot" aria-label="Boot sequence">
      <div className="boot__inner">
        <p className="boot__hint" id="bootHint">drag the little one into the folder</p>

        <div
          className="photo-drag"
          id="photoDrag"
          role="img"
          aria-label="Baby photo of Prapti — drag me"
        >
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
          <span className="photo-drag__caption">prapti · 0 yrs</span>
        </div>

        <div className="folder" id="folder" aria-label="Folder: Half way to 30">
          <div className="folder__shape">
            <div className="folder__tab" />
            <div className="folder__front" />
          </div>
          <span className="folder__label">HALF&nbsp;WAY&nbsp;TO&nbsp;30</span>
        </div>
      </div>
    </section>
  );
}
