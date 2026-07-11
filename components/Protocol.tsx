export default function Protocol() {
  return (
    <section className="protocol" id="protocol">
      <div className="protocol__inner">
        <p className="protocol__kicker">protocol</p>
        <h2 className="protocol__title">PROTOCOL&nbsp;15</h2>
        <p className="protocol__status" id="protocolStatus">
          INITIALISING
          <span className="dots">
            <i>.</i>
            <i>.</i>
            <i>.</i>
          </span>
        </p>
        <div className="protocol__bar">
          <span id="protocolFill" />
        </div>
        <p className="protocol__hint" id="protocolHint">keep scrolling to initialise ↓</p>
      </div>
    </section>
  );
}
