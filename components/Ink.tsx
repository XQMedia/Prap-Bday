export default function Ink() {
  return (
    <section className="scene scene--ink" id="ink" aria-label="The note">
      <div className="ink__paper">
        <span className="ink__tape" />
        <div className="ink__page">
          <div className="ink__line" id="inkLine" aria-live="polite" />
          <span className="ink__nib" id="inkNib" />
        </div>
        <p className="ink__sign" id="inkSign">— evidence: anonymous note, found at the scene</p>
      </div>
    </section>
  );
}
