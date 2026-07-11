import { LETTERS } from "@/lib/data";

const skins = ["envelope--a", "envelope--b", "envelope--c", "envelope--d"];

export default function Letters() {
  return (
    <>
      <section className="letters" id="letters">
        <p className="eyebrow reveal">from the people who love you</p>
        <h2 className="letters__title reveal">secret&nbsp;letters</h2>
        <p className="letters__hint reveal">tap an envelope to open it</p>
        <div className="letters__field" id="lettersField">
          {LETTERS.map((L, i) => (
            <button
              className={`envelope ${skins[i % skins.length]}`}
              key={i}
              data-index={i}
              aria-label="Open letter"
            >
              <span className="envelope__body" />
              <span className="envelope__flap" />
              <span className="envelope__seal">{L.seal}</span>
              <span className="envelope__name">for prapti</span>
            </button>
          ))}
        </div>
      </section>

      {/* letter modal (populated imperatively when an envelope is opened) */}
      <div className="modal" id="letterModal" aria-hidden="true">
        <div className="modal__backdrop" id="modalBackdrop" />
        <div className="modal__card" id="modalCard" role="dialog" aria-modal="true">
          <button className="modal__close" id="modalClose" aria-label="Close">
            ×
          </button>

          <div className="modal__letter" id="modalLetter">
            <p className="modal__from">a letter for prapti</p>
            <p className="modal__body" id="modalBody" />
            <p className="modal__sign">— ?</p>
          </div>

          <div className="modal__quiz" id="modalQuiz">
            <p className="modal__q">Who wrote this?</p>
            <div className="modal__choices" id="modalChoices" />
          </div>

          <div className="modal__reveal" id="modalReveal">
            <div className="modal__face" id="modalFace" />
            <p className="modal__name" id="modalName" />
            <button className="btn" id="modalNext">
              next letter →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
