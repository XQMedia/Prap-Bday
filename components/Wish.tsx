export default function Wish() {
  return (
    <section className="wish sec--dark" id="wish">
      <div className="wish__stage" id="wishStage">
        <div className="starfield" aria-hidden="true" />
        <p className="wish__hint" id="wishHint">keep scrolling ↓</p>

        {/* decorations that drift away as you scroll */}
        <span className="wish__deco wish__deco--1">🎈</span>
        <span className="wish__deco wish__deco--2">✦</span>
        <span className="wish__deco wish__deco--3">🎈</span>
        <span className="wish__deco wish__deco--4">✿</span>
        <span className="wish__deco wish__deco--5">✦</span>
        <span className="wish__deco wish__deco--6">❀</span>

        <div className="cake" id="cake">
          <div className="cake__flame" id="cakeFlame">
            <span className="cake__smoke" id="cakeSmoke" />
          </div>
          <div className="cake__candle" />
          <div className="cake__top" />
          <div className="cake__tier cake__tier--mid" />
          <div className="cake__tier cake__tier--base" />
          <div className="cake__plate" />
        </div>

        <div className="wish__text" id="wishText">
          <p className="wish__line" data-step="make">Make a wish…</p>
          <p className="wish__line" data-step="blow">Blow in</p>
          <p className="wish__count" data-step="count" id="wishCount">3</p>
        </div>

        <div className="wish__dark" id="wishDark" aria-hidden="true" />
      </div>
    </section>
  );
}
