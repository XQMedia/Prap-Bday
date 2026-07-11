export default function Install() {
  return (
    <section className="scene scene--install" id="install" aria-label="Installation">
      <div className="install__inner">
        <p className="install__title">
          Installing&nbsp;<span>prapti_15.pkg</span>
        </p>
        <div className="install__bar">
          <span className="install__fill" id="installFill" />
        </div>
        <div className="install__meta">
          <span className="install__status" id="installStatus">preparing the confetti…</span>
          <span className="install__pct" id="installPct">0%</span>
        </div>
        <p className="install__note">this update contains one (1) whole year of you</p>
      </div>
    </section>
  );
}
