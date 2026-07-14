import { LETTERS } from "@/lib/data";

const skins = ["envelope--a", "envelope--b", "envelope--c", "envelope--d"];

export default function Letters() {
  return (
    <>
      <section className="letters" id="letters">
        <div className="filehead reveal">
          <p className="filehead__no">Evidence Log · D</p>
          <h2 className="filehead__title">witness statements</h2>
          <p className="letters__hint">open a sealed statement — then identify the witness</p>
        </div>
        <div className="letters__field" id="lettersField">
          {LETTERS.map((L, i) => (
            <button
              className={`envelope ${skins[i % skins.length]}`}
              key={i}
              data-index={i}
              aria-label="Open sealed statement"
            >
              <span className="envelope__tag">WITNESS {String(i + 1).padStart(2, "0")}</span>
              <span className="envelope__body" />
              <span className="envelope__flap" />
              <span className="envelope__seal">{L.seal}</span>
              <span className="envelope__name">sealed</span>
            </button>
          ))}
        </div>
      </section>

      {/* statement modal */}
      <div className="modal" id="letterModal" aria-hidden="true">
        <div className="modal__backdrop" id="modalBackdrop" />
        <div className="modal__card" id="modalCard" role="dialog" aria-modal="true">
          <span className="stamp stamp--sm modal__stamp">Statement</span>
          <button className="modal__close" id="modalClose" aria-label="Close">
            ×
          </button>

          <div className="modal__letter" id="modalLetter">
            <p className="modal__from">witness statement · re: the subject</p>
            <p className="modal__body" id="modalBody" />
            <p className="modal__sign">— ?</p>
          </div>

          <div className="modal__quiz" id="modalQuiz">
            <p className="modal__q">Who gave this statement?</p>
            <div className="modal__choices" id="modalChoices" />
          </div>

          <div className="modal__reveal" id="modalReveal">
            <div className="modal__face" id="modalFace" />
            <p className="modal__name" id="modalName" />
            <button className="btn" id="modalNext">
              next statement →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
