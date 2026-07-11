export default function Celebrate() {
  return (
    <section className="celebrate" id="celebrate">
      <div className="celebrate__sky" id="celebrateSky" aria-hidden="true" />
      <div className="celebrate__inner">
        <h2 className="celebrate__title reveal">
          happy&nbsp;birthday,
          <br />
          <em>prapti</em>
        </h2>
        <p className="celebrate__sub reveal">fifteen looks beautiful on you</p>
      </div>
      <button className="music-toggle" id="musicToggle" aria-label="Toggle music">
        <span className="music-toggle__icon">♪</span>
        <span className="music-toggle__label">music&nbsp;on</span>
      </button>
    </section>
  );
}
