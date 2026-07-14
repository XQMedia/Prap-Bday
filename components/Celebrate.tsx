export default function Celebrate() {
  return (
    <section className="celebrate" id="celebrate">
      <div className="celebrate__sky" id="celebrateSky" aria-hidden="true" />
      <div className="celebrate__inner">
        <div className="celebrate__stamp">
          <span className="stamp stamp--round" id="solvedStamp">Case Solved</span>
        </div>
        <h2 className="celebrate__title">
          the culprit was <em>joy</em>
          <br />
          all along
        </h2>
        <p className="celebrate__sub">happy birthday, prapti — fifteen looks beautiful on you</p>
      </div>
      <button className="music-toggle" id="musicToggle" aria-label="Toggle music">
        <span className="music-toggle__icon">♪</span>
        <span className="music-toggle__label">music&nbsp;on</span>
      </button>
    </section>
  );
}
