import { WISDOM } from "@/lib/data";

export default function Wisdom() {
  return (
    <section className="wisdom" id="wisdom">
      <div className="filehead reveal">
        <p className="filehead__no">Evidence Log · B</p>
        <h2 className="filehead__title">the detective&rsquo;s notes</h2>
        <p className="letters__hint">clues collected on the subject, age fifteen</p>
      </div>
      <div className="wisdom__stack" id="wisdomStack">
        {WISDOM.map((w, i) => (
          <article className="wcard" key={i}>
            <span className="wcard__tape" aria-hidden="true" />
            <span className="wcard__mark">{w.mark}</span>
            <span className="wcard__no">
              clue №{String(i + 1).padStart(2, "0")} / {String(WISDOM.length).padStart(2, "0")}
            </span>
            <h3 className="wcard__topic">{w.topic}</h3>
            <p className="wcard__text">{w.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
