import { ENDING_POEM } from "@/lib/data";
import { Tulip } from "./Deco";

export default function Ending() {
  return (
    <section className="ending" id="ending">
      <div className="ending__stars" id="endingStars" aria-hidden="true" />
      <div className="ending__inner">
        <div className="ending__stamp">
          <span className="stamp stamp--round">Case Closed</span>
        </div>

        <div className="ending__poem reveal">
          {ENDING_POEM.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>

        <Tulip className="reveal" style={{ opacity: 0.95, transform: "rotate(-6deg)" }} />

        <h2 className="ending__wish reveal">
          Happy&nbsp;Birthday,&nbsp;Prapti.&nbsp;<span className="heart">♡</span>
        </h2>
      </div>
    </section>
  );
}
