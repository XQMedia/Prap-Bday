import { Tulip } from "./Deco";

type Item = { c: string; x: string; y: string; r?: number; d?: number; s?: string };

/* a scattered layer of tulips, sparkles and little doodles */
const SETS: Record<string, Item[]> = {
  a: [
    { c: "✦", x: "8%", y: "18%", r: -8, d: 0 },
    { c: "✿", x: "88%", y: "24%", r: 10, d: 1.2 },
    { c: "❀", x: "16%", y: "72%", r: 6, d: 0.6 },
    { c: "✧", x: "78%", y: "68%", r: -6, d: 1.8 },
    { c: "♡", x: "50%", y: "10%", r: 0, d: 0.9, s: "doodle" },
    { c: "★", x: "92%", y: "52%", r: 0, d: 2.2 },
  ],
  b: [
    { c: "✧", x: "6%", y: "30%", r: 0, d: 0.4 },
    { c: "♡", x: "90%", y: "40%", r: 0, d: 1.1, s: "doodle" },
    { c: "✦", x: "12%", y: "84%", r: 0, d: 1.7 },
    { c: "❀", x: "84%", y: "78%", r: 12, d: 0.8 },
  ],
};

export default function Floaty({
  set = "a",
  tulips = true,
}: {
  set?: "a" | "b";
  tulips?: boolean;
}) {
  const items = SETS[set];
  return (
    <div className="floaty" aria-hidden="true">
      {items.map((it, i) => (
        <span
          key={i}
          className={it.s === "doodle" ? "fl-doodle" : "fl-spark"}
          style={{ left: it.x, top: it.y, ["--r" as string]: `${it.r ?? 0}deg`, animationDelay: `${it.d ?? 0}s` }}
        >
          {it.c}
        </span>
      ))}
      {tulips && (
        <>
          <Tulip style={{ position: "absolute", left: "4%", bottom: "8%", width: 54, opacity: 0.85, ["--r" as string]: "-14deg", transform: "rotate(-14deg)" }} />
          <Tulip style={{ position: "absolute", right: "5%", top: "12%", width: 46, opacity: 0.8, transform: "rotate(16deg)" }} />
        </>
      )}
    </div>
  );
}
