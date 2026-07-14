import Floaty from "./Floaty";

export default function Fifteen() {
  return (
    <section className="fifteen pattern-dots" id="fifteen">
      <Floaty set="a" />

      <div className="fifteen__evrow reveal">
        <span className="evtag">Subject</span>
        <span className="stamp stamp--sm">Person of Interest</span>
      </div>

      <h1 className="fifteen__num" id="fifteenNum" aria-label="Fifteen">
        <span className="fifteen__circle" aria-hidden="true" />
        <span>1</span>
        <span>5</span>
        <span className="fifteen__arrow" style={{ right: "-36%", top: "16%" }} aria-hidden="true">
          ↖ strange, this one
        </span>
      </h1>

      <div className="fifteen__body">
        <p className="reveal">Fifteen is a strange, tender age. The case notes agree.</p>
        <p className="reveal">
          Half child, half something new — collecting opinions, losing a few,
          learning the exact shape of her own mind.
        </p>
        <p className="reveal">
          Prime suspect in the disappearance of childhood: <em>growing up.</em>{" "}
          Motive: to become exactly who she is.
        </p>
        <p className="reveal fifteen__accent">
          A new chapter opens. The investigation continues.
        </p>
      </div>
      <span className="scroll-cue reveal">follow the evidence ↓</span>
    </section>
  );
}
