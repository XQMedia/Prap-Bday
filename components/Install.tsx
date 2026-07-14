export default function Install() {
  return (
    <section className="scene scene--install" id="install" aria-label="Decrypting case file">
      <div className="install__inner">
        <div className="install__badge">
          <span className="stamp stamp--sm stamp--pop">Classified</span>
        </div>
        <p className="install__title">
          decrypting <span>case_no_15.file</span>
        </p>
        <div className="install__bar">
          <span className="install__fill" id="installFill" />
        </div>
        <div className="install__meta">
          <span className="install__status" id="installStatus">dusting for prints…</span>
          <span className="install__pct" id="installPct">0%</span>
        </div>
        <p className="install__note">
          contents: one (1) whole year of the subject, redacted for your eyes only
        </p>
      </div>
    </section>
  );
}
