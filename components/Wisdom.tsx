import { WISDOM } from "@/lib/data";

export default function Wisdom() {
  return (
    <section className="wisdom" id="wisdom">
      <p className="eyebrow reveal">notes for the road</p>
      <div className="wisdom__stack" id="wisdomStack">
        {WISDOM.map((w, i) => (
          <article className="wcard" key={i}>
            <span className="wcard__mark">{w.mark}</span>
            <span className="wcard__no">
              note {String(i + 1).padStart(2, "0")} / {String(WISDOM.length).padStart(2, "0")}
            </span>
            <h3 className="wcard__topic">{w.topic}</h3>
            <p className="wcard__text">{w.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
