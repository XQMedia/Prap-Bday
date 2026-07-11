export default function Fifteen() {
  return (
    <section className="fifteen" id="fifteen">
      <p className="eyebrow reveal">chapter fifteen</p>
      <h1 className="fifteen__num" id="fifteenNum" aria-label="Fifteen">
        <span>1</span>
        <span>5</span>
      </h1>
      <div className="fifteen__body">
        <p className="reveal">Fifteen is a strange, tender age.</p>
        <p className="reveal">
          You are half child, half something new — collecting opinions, losing a
          few, learning the exact shape of your own mind.
        </p>
        <p className="reveal">
          This is the year of first drafts. You are allowed to make mistakes, to
          change, to not have the answer yet.
        </p>
        <p className="reveal fifteen__accent">
          A new chapter is quietly beginning. It suits you.
        </p>
      </div>
      <span className="scroll-cue reveal">scroll ↓</span>
    </section>
  );
}
