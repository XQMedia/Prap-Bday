export default function Protocol() {
  return (
    <section className="protocol sec--dark" id="protocol">
      <div className="starfield" aria-hidden="true" />
      <span className="glow" style={{ width: "40vmax", height: "40vmax", left: "50%", top: "50%", transform: "translate(-50%,-50%)", background: "radial-gradient(circle,rgba(255,110,150,.3),transparent 65%)" }} aria-hidden="true" />
      <div className="protocol__inner">
        <p className="protocol__kicker">the case cracks open</p>
        <h2 className="protocol__title">PROTOCOL&nbsp;15</h2>
        <p className="protocol__status" id="protocolStatus">
          CROSS-REFERENCING THE EVIDENCE
          <span className="dots">
            <i>.</i>
            <i>.</i>
            <i>.</i>
          </span>
        </p>
        <div className="protocol__bar">
          <span id="protocolFill" />
        </div>
        <p className="protocol__hint" id="protocolHint">keep scrolling to crack the case ↓</p>
      </div>
    </section>
  );
}
